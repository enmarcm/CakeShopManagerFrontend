import torta2 from "../imgs/torta2.svg";
import dinoLoginSvg from "../imgs/dinoLogin.svg";
import infoInputsBo from "../constants/infoInputsBO";
import "../styles/OlvidoDatos.css";
import "../styles/Login.css";
import { useState } from "react";
import MagicForms from "./MagicForms";
import ButtonVe from "./ButtonVe";
import getMapInputs from "../service/getMapInputs";
import fetcho from "../service/fetcho";
import { useNavigate } from "react-router";
import ModalBase from "./ModalBase";

const OlvidoDatos = ({setLoading}) => {
    const navigate = useNavigate()
    const idInputs = ['inUsuario']
    const [mapaInfo, setMapaInfo] = useState(null)
    const [dataModal, setDataModal] = useState(null)
    const [modalIsVisible, setModalIsVisible] = useState(false)

    const handleClick = async () =>{
        const data = getMapInputs({mapaInfo, idInputs})
        
        const dataFetch = {user: data?.inUsuario}
        setLoading(true)
        const result = await fetcho({url: "/olvidoDatos", method: "POST", body: dataFetch}) 
        setLoading(false)

        if(result.questions) return navigate('/olvidoDatos/preguntas', {state: {questions: result.questions}})

        setDataModal(result.error || result.message)
        setModalIsVisible(true)
    }
    
    if(modalIsVisible && dataModal) return <ModalBase setIsModalVisible={setModalIsVisible} content={dataModal}/>
  return (
    <section className="container-login">
      <div className="card-login container-olvido">
        <div className="grid-login login-container olvido-container">
          <div className="ingresa-img">
            <img src={torta2} alt="Torta" />
            <h1>Olvidé mis datos</h1>
          </div>
            <p>Ingresa tu usuario para recuperar tus datos</p>
          <div className="inputs-login olvido-inputs">
            <MagicForms infoData={infoInputsBo.olvidoDatos} mapaInfo={setMapaInfo}/>

            <ButtonVe content={"Enviar"} click={handleClick}/>
          </div>
        </div>
        <div className="grid-login dino-login">
          <div className="container-dino-login">
            <h2>
              Tranqui <br />
              Pronto podrás ingresar
            </h2>
            <img src={dinoLoginSvg} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OlvidoDatos;
