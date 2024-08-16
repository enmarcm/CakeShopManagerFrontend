import { useState, useEffect } from "react";



import MensajesComponent from "./Message";
const ChatProbe = ({
    messageInitial,
    onNewMessage,
    userProperty
}) => {
    const [renderedMessage, setRenderedMessages] = useState([]);
    const [haveNotMessage, setHaveNotMessage] = useState(null);

    useEffect(() => {
        let keyCont = 0;
        console.log('Aqui mensajes iniciales', messageInitial)
        if (!messageInitial || messageInitial.length <= 0) {
            console.log('Entro aqui porque no tiene mensajes que cargar')
            return setHaveNotMessage(<div>No tiene nuevos mensajes</div>);
        }
        // Mapear los mensajes iniciales a componentes de mensajes
        const messageComponents = messageInitial.map((obj) => {
            keyCont++;
            return <MensajesComponent key={keyCont} userProperty={userProperty} infoMessage={obj} />;
        });
        setRenderedMessages(messageComponents);
    }, [messageInitial]);

    useEffect(() => {
        if (!onNewMessage) {
            console.log('El nuevo mensaje es undefined');
            return;
        }
        setHaveNotMessage(false)
        console.log('Entro aqui', onNewMessage);

        setRenderedMessages(prevMessages => [
            ...prevMessages,
            <MensajesComponent userProperty={userProperty} key={prevMessages.length + 1} infoMessage={onNewMessage} />
        ]);
    }, [onNewMessage]);

    return (
        <>
            <div className="chat-container">
                <div className="messages-container">
                    {haveNotMessage ? (
                        haveNotMessage
                    ) : (
                        renderedMessage
                    )}
                </div>
            </div>
        </>
    )
}
export default ChatProbe;