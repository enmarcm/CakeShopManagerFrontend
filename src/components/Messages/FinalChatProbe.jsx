import ChatProbe from "./ChatProbe";
import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { Input } from "antd";
import sendMessageByBeibi from "../../service/sendMessage";
import fetcho from "../../service/fetcho";
import iClient from "../../instances/iClientSocket";

import messageIcon from "../../icons/comentario-alt.svg";
import groupIcon from "../../icons/usuarios-alt.svg";
import twoIcon from "../../icons/usuarios.svg";
import ModalSession from "../ModalSession";
import { useRef } from "react";

const FinalChatProbe = ({ typeChat, userData }) => {
  const [icon, setIcon] = useState(null);
  const [chatMessage, setChatMessage] = useState();
  const [newMessage, setNewMessage] = useState(null);

  const [objInfo, setObjInfo] = useState({});
  const [typeEvent, setTypeEvent] = useState(null);
  const [objChat, setObjChat] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const [typeChatReal, setTypeChatReal] = useState(null);
  const [socket, setSocket] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const chatsEndRef = useRef(null);


  useEffect(() => {
    setTimeout(() => {

    if(!newMessage) return
      if(!chatsEndRef) return 
      const scrollElement = chatsEndRef.current;
  
      if(!scrollElement) return;
      scrollElement.scrollTop = scrollElement.scrollHeight;

    }, 100);
  }, [newMessage]);

  useEffect(() => {
    if (!typeChat || !objChat) return;

    if (objChat[typeChat] === "direct") setTypeChatReal('direct');

    if (objChat[typeChat] === "namespace") setTypeChatReal("broadcast");

    if (typeChat === 'zones') setTypeChatReal('by zone');

  }, [typeChat, objChat])

  useEffect(() => {
    if (!userData || !typeChatReal) return;

    const { user, profile } = userData;
    const loadMessageInitial = async () => {
      try {
        const messages = await fetcho({
          url: "/toProcess",
          method: "POST",
          body: {
            area: "messanger",
            object: "control",
            method: "getMessageBy",
            params: {
              option: "typeanduser",
              params: [typeChatReal, user.toLowerCase()]
            },
          },
        });
        if (!messages || messages.error)
          return console.error(
            `Hubo un error obtener los mensajes del usuario`,
            messages.error
          );

        if (messages?.errorSession) setIsErrorSession(true);

        setChatMessage(messages);
      } catch (error) {
        console.error(
          "Hubo un error al intentar cargar los mensajes del usuario",
          error
        );
        return null;
      }
    }
    loadMessageInitial();
  }, [userData, typeChatReal])

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const rooms = await fetcho({
          url: "/toProcess",
          method: "POST",
          body: {
            area: "local",
            object: "control",
            method: "getAllOf",
            params: { of: 'route' },
          },
        });

        if (!rooms || rooms.error)
          return console.error(
            "Hubo un error al intentar obtener las rutas",
            rooms.error
          );

        if (rooms?.errorSession) setIsErrorSession(true);

        let array = [];
        rooms.forEach((obj) => {
          array.push(obj["de_route"]);
        });
        const obj = {
          direct: "direct",
          broadcast: "namespace",
          zones: array,
        };

        setObjChat(obj);
      } catch (error) {
        console.error("Hubo un error al cargar los rooms", error);
        return null;
      }
    };
    loadRooms();
  }, [])

  useEffect(() => {
    if (!userData) return;

    const { user, profile } = userData
    const loadSocketClient = async () => {
      try {

        const socketClient = iClient.createSocketClient({
          objUser: userData,
        });

        if (!socketClient)
          return console.error("Hubo un error al crear el socket del client");

        const [route] = await fetcho({
          url: "/toProcess",
          method: "POST",
          body: {
            area: "local",
            object: "control",
            method: "getRouteBy",
            params: {
              option: "user",
              params: [user.toLowerCase()],
            },
          },
        });
        if (!route || route.error) {
          return console.error(
            "Hubo un error al intentar obtener la ruta del usuario",
            route.error
          );
        }

        // console.log("Esta es la ruta a la que se va a unir ese usuario", route['de_route']);
        const joinNamespace = iClient.joinNamespace(socketClient);
        const joinRoom = iClient.joinRoom(socketClient, route['de_route']);

        if (
          !joinNamespace ||
          joinNamespace.error ||
          joinRoom.error ||
          !joinRoom
        )
          return console.error(
            "Hubo un error al unirse al nameSpace o al room"
          );

        console.log("El usuario que envia el mensaje es: ", user);


        const obj = {
          socketEmit: socketClient,
          byUser: user,
        };

        setObjInfo(obj);
        setSocket(socketClient);
      } catch (error) {
        console.error("Hubo un error al crear el socket del client", error);
        return;
      }
    };
    if (!socket) {
      // console.log("El socket es undefined por lo que lo puede crear");
      loadSocketClient();
    }
  }, [userData]);

  useEffect(() => {
    if (!typeChat) return;

    const icons = {
      broadcast: groupIcon,
      direct: messageIcon,
      zones: twoIcon,
    };
    const verify = icons[typeChat];
    if (!verify)
      return console.error("El tipo de chat no es valido para los iconos");

    return setIcon(verify);
  }, [typeChat]);

  useEffect(() => {
    //?  Eventos listeners
    if (!objChat) return;

    if (objChat[typeChat] === "direct") return setTypeEvent("direct_message");

    if (objChat[typeChat] === "namespace") {
      return setTypeEvent("broadcast_message");
    }

    if (typeChat === 'zones') {
      return setTypeEvent("room_message");
    }

    return console.error("Tipo de chat invalido");
  }, [objChat]);

  const validateImage = (data) => {
    const { file, typeFile } = data;
    if (typeFile === "image") {
      console.log("Es una imagen");
      const imgTag = `<img src="${file}">`;
      return imgTag;
    } else if (typeFile === "voice") {
      console.log("Es un audio");
      //Manejo de audio
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!socket || !typeEvent) return;

    console.log("Aqui el evento segun el tipo de chat es ->: ", typeEvent);
    socket.on(typeEvent, (data) => {
      console.log(`EVENTO`)
      console.log(`Mesaje recibido`, data);
      const isImg = validateImage(data);
      if (isImg) return setNewMessage({ data, image: isImg });

      setNewMessage({ ...data, isReceiving: true });
    });

    return () => {
      if (socket) {
        socket.off(typeEvent);
      }
    };
  }, [socket, typeEvent]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendTextMessage = () => {
    let typeChatSend = "";

    if (objChat[typeChat] === "direct") typeChatSend = "direct";

    if (objChat[typeChat] === "namespace") typeChatSend = "broadcast";

    if (typeChat === 'zones') typeChatSend = "by zone";

    if (typeChatSend.length <= 2)
      return console.error("El tipo de chat ingresado no es valido");


    const success = sendMessageByBeibi({
      socketEmit: objInfo.socketEmit,
      typeChatMessage: typeChatSend,
      sendToUser: objInfo["sendToUser"],
      inputValue: inputValue,
      objChat: objChat,
    });
    if (!success) {
      console.error("Hubo un error al enviar el mensaje");
      return;
    }
    setInputValue("");

    setNewMessage({
      usuario: objInfo.byUser,
      emisor: objInfo.byUser,
      fecha: new Date().toLocaleDateString(),
      contenido: inputValue,
    });
  };

  // const handleSendImageMessage = (message, image) => {
  //   // Implementa la lógica para enviar una imagen aquí
  //   //Abrir un modal o una ventana de selección de archivos
  //   iClient.loadImage({
  //     socket: objInfo.socketEmit,
  //     file: fileSeleccionado ? fileSeleccionado : image,
  //     destination: typeChat,
  //     message: inputValue ? inputValue : message,
  //   });
  // };

  const toggleChat = () => {
    setShowChat((prevShowChat) => !prevShowChat);
  };

  if (isErrorSession) return <ModalSession />;

  return (
    <div className={showChat ? "container-all-chat" : "container-all-chat chat-not-show"}>
      <Button
        className={showChat ? "icon-button p-2 m-1 p-sm-0 chat-cerrado" : "icon-button p-2 m-1 p-sm-0"}
        variant="link"
        onClick={toggleChat}
      >
        <img
          src={icon}
          alt="Icon chat"
          style={{ width: "2.5rem", height: "2.5rem" }}
          className="icon-chat-img"
        />
      </Button>
      {showChat && (
        <div className="container-group-chats" ref={chatsEndRef}>
          <ChatProbe
            messageInitial={chatMessage}
            onNewMessage={newMessage}
            userProperty={userData.user}
          />
          
        </div>
      )}
      <div className="container-group-chats-buttons">
            {/* <Button
              className="send-image-button button-chat"
              onClick={handleSendImageMessage}
            >
              Enviar Imagen
            </Button> */}
            <Input
              className="input-chat-message"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
            />
            <Button
              className="send-text-button button-chat"
              onClick={handleSendTextMessage}
            >
              Enviar
            </Button>
          </div>
    </div>
  );
};

export default FinalChatProbe;