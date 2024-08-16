import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MagicForms from "./MagicForms";
import ButtonVe from "./ButtonVe";
import getMapInputs from "../service/getMapInputs";
import fetcho from "../service/fetcho";
import "../styles/Preguntas.css";
import ModalBase from "./ModalBase";
import ModalSession from "./ModalSession";
import { useNavigate } from "react-router-dom";

const Preguntas = ({setLoading}) => {
  const navigate = useNavigate()
  const location = useLocation();
  const questions = location.state?.questions;
  const [mapaInfo, setMapaInfo] = useState(null);
  const [olvidoDatos, setOlvidoDatos] = useState(null);
  const [dataModal, setDataModal] = useState(null);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [isErrorSession, setIsErrorSession] = useState(false);

  const handleClick = async () => {
    const data = getMapInputs({ mapaInfo, idInputs: ["id-0", "id-1"] });

    //VALIDAR CON SCHEMA

    if (!data["id-0"] || !data["id-1"]) {
        setDataModal("Debes responder todas las preguntas");
        setModalIsVisible(true);
        return;
      }

    const obj = {
      answers: [{ answer: data["id-0"] }, { answer: data["id-1"] }],
    };

    setLoading(true)
    const result = await fetcho({
      url: "/olvidoDatos/cargarPreguntas",
      method: "POST",
      body: obj,
    });
    setLoading(false)


    if (result.errorSession) {
      return setIsErrorSession(true);
    }

    if (result?.messageSucess) {
      return navigate("/olvidoDatos/envioCorreo");
    }

    if (result?.message) {
      setDataModal(result.message);
      setModalIsVisible(true);
    } else if (result.error) {
      setDataModal(result.error);
      setModalIsVisible(true);
    }
  };

  useEffect(() => {
    if (!questions) return navigate("/olvidoDatos");

    const data = questions.map((item, index) => ({
      type: "text",
      label: item.question,
      id: `id-${index}`,
      placeholder: "Ingresa pregunta",
    }));

    setOlvidoDatos(data);
  }, [questions]);

  if (isErrorSession) return <ModalSession />;
  if (modalIsVisible && dataModal)
    return (
      <ModalBase
        content={dataModal}
        setIsModalVisible={setModalIsVisible}
        isClose={modalIsVisible}
      />
    );

  return (
    <section className="container-login">
      <div className="card-login card-questions">
        <div className="grid-login login-container question-container">
          <div className="questions-h1-container">
            <h1 className="questions-h1">
              Responde las preguntas de seguridad
            </h1>
          </div>

          {olvidoDatos && (
            <MagicForms infoData={olvidoDatos} mapaInfo={setMapaInfo} />
          )}

          <ButtonVe content={"Enviar"} click={handleClick} />
        </div>
      </div>
    </section>
  );
};

export default Preguntas;
