import iClient from "../instances/iClientSocket";

const sendMessageByBeibi = ({
  socketEmit,
  typeChatMessage,
  inputValue,
  sendToUser,
  objChat
}) => {
  if (inputValue.trim() !== "") {
    if (typeChatMessage === "direct") {
      // console.log('En sendMessage se ejecuta el mensaje directo')
      const send = iClient.sendDirectMessage({
        socketEmit: socketEmit,
        user: sendToUser,
        message: inputValue,
      });
      if (!send) {
        return false;
      }
    }

    if (objChat[typeChatMessage] === "namespace") {
      // console.log('En sendMessage se ejecuta un mensaje de broadcast')
      const send = iClient.sendMessageBroadcast({
        socket: socketEmit,
        message: inputValue,
      });



      if (!send || send.error) {
        return console.error('Hubo un error al enviar un mensaje general', send.error);
      }
    }

    if (typeChatMessage === 'by zone') {
      // console.log('En sendMessage se ejecuta un mensaje de room');
      const send = iClient.sendMessage({
        socketEmit: socketEmit,
        room: typeChatMessage,
        message: inputValue,
      });

      if (!send || send.error) {
        console.log("No se envio el mensaje");
        return false;
      }
      return true;
    }

    // console.log('Aqui se termina todo porque fue bien');
    return true;
  }

  console.log('Aqui se termina todo porque fue mal');
  return false;
};

export default sendMessageByBeibi;
