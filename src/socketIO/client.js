
import { io } from 'socket.io-client'

class Client {
    constructor({ url }) {
        this.rooms = {}
        // let arrayRooms = funct()
        // console.log('Aqui rooms', arrayRooms)
        // arrayRooms.forEach(room => {
        //     this.rooms[room] = true
        // });
        this.url = url;
        this.io = io;
        this.namespace = 'myNamespace';
        this.imgTag;
    }
    //Crea el socket del cliente que se conecto
    createSocketClient = ({ objUser }) => {
        try {
            const socket = this.io(this.url, {
                query: {
                    ...objUser,
                },
                extraHeaders: {
                    "my-custom-header": "abcd"
                }
            })

            return socket;
        } catch (error) {
            return { error: error.message }
        }

    }
    joinNamespace = (socket) => {
        try {
            socket.emit('join_namespace', this.namespace);
            return true;
        } catch (error) {
            return { error: error.message }
        }
    }

    joinRoom = (socket, room) => {
        // if (!this.rooms[room]) {
        //     return false;
        // }
        try {
            socket.emit('join_room', room)
            return true;
        } catch (error) {
            return { error: error.message }
        }
    }

    // Envía un mensaje a un room dentro de un namespace
    sendMessage = ({ socketEmit, room, message }) => {

        // if (!this.rooms[room]) {
        //     console.log('No se encuentra el room');
        //     return false;
        // }
        try {
            // console.log('Aqui socketEmit', socketEmit);
            socketEmit.emit('message zone', { room, message });
            return true;
        } catch (error) {
            console.error(error)
            return { error: error.message }
        }
    }

    sendMessageBroadcast = ({ socket, message }) => {
        try {
            console.log('HOla');
            socket.emit('general message', { namespace: this.namespace, message })
            return true;
        } catch (error) {
            return { error: error.message }
        }
    }

    // Envía un mensaje directo a un usuario
    sendDirectMessage = ({ socketEmit, user, message }) => {
        try {
            socketEmit.emit('direct message', { socketEmit, user, message });
            return true;
        } catch (error) {
            return { error: error.message }
        }
    }

    // Carga un archivo al servidor
    #uploadFile = ({ socket, user, file, destination, message, isImg }) => {
        const reader = new FileReader();
        reader.onload = (evt) => {
            socket.emit('file', { socket, file: evt.target.result, destination, user, message, isImg });
            return true;
        };
        reader.onerror = (error) => {
            return { error: error.message }
        };
        reader.readAsDataURL(file);
    }

    // Carga una imagen al servidor
    loadImage = ({ socket, file, destination = this.namespace, message = 'image' }) => {
        this.#uploadFile({
            socket: socket,
            file: file,
            destination: destination,
            socket: socket,
            typeFile: 'image',
            message: message
        });
    }

    // Carga una nota de voz al servidor
    loadVoiceNote = ({ socket, file, destination = this.namespace, message = 'voice' }) => {
        this.#uploadFile({
            socket: socket,
            file: file,
            destination: destination,
            socket: socket,
            typeFile: 'voice',
            message: message
        });
    }

    //*Escucha los diferentes eventos del cliente
    listenEvents = (socket, typeChat, state) => {

        if (typeChat === 'room') {
            socket.on('room message', (data) => {
                const { message } = data
                const isImg = this.#validateImage(data);
                if (isImg) return state({ message, image: isImg });

                console.log(`Mesaje recibido`, data);

                state({ message });
                //Logica para mostrar mensajes recibidos por el usuario, se puedo pasar en el constructor los 3 diferentes container para poder llenarlos cuando se reciba un mensaje
            });

        } else if (typeChat === 'direct') {
            socket.on('direct message', (data) => {
                const { message } = data
                const isImg = this.#validateImage(data);
                if (isImg) return state({ message, image: isImg });

                console.log(`Mesaje recibido`, data);

                state({ message });
                //Logica para mostrar mensajes recibidos por el usuario, se puedo pasar en el constructor los 3 diferentes container para poder llenarlos cuando se reciba un mensaje
            });

        } else if (typeChat === 'broadcast') {
            socket.on('broadcast_message', (data) => {
                const { message } = data
                const isImg = this.#validateImage(data);
                if (isImg) return state({ message, image: isImg });

                console.log(`Mesaje recibido`, data);

                state({ message });
                //Logica para mostrar mensajes recibidos por el usuario, se puedo pasar en el constructor los 3 diferentes container para poder llenarlos cuando se reciba un mensaje
            });
        }

        return false;
    }

    //Este metodo devuelve el tag de la imagen para que sea mostrada en el chat
    #validateImage = (data) => {
        const { file, typeFile } = data;
        if (typeFile === 'image') {
            console.log('Es una imagen');
            const imgTag = `<img src="${file}">`
            return imgTag;
        } else if (typeFile === 'voice') {
            console.log('Es un audio');
            //Manejo de audio
            return true;
        } else {
            return false;
        }
    }

    // Desplaza automáticamente el contenedor de chat hasta el final
    autoScroll = (container) => {
        container.scrollTop = container.scrollHeight;
    }

    //incia la grabacion de audio
    startRecording = () => {
        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.audioChunks = [];

                    this.mediaRecorder.addEventListener("dataavailable", event => {
                        this.audioChunks.push(event.data);
                    });

                    this.mediaRecorder.start();

                    // Detiene la grabación después de 2 minutos
                    this.stopRecordingTimeout = setTimeout(() => {
                        this.stopRecording();
                    }, 120000);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    // Detiene la grabación de audio
    stopRecording = () => {
        return new Promise((resolve, reject) => {
            if (!this.mediaRecorder) {
                reject(new Error('No se está grabando audio'));
            } else {
                this.mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(this.audioChunks);
                    resolve(audioBlob);

                    // Limpia las variables
                    this.mediaRecorder = null;
                    this.audioChunks = [];
                    clearTimeout(this.stopRecordingTimeout);
                });

                this.mediaRecorder.stop();
            }
        });
    }
}

export default Client