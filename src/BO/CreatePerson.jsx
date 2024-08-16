import MagicForms from "../components/MagicForms";
import { useState, useEffect } from "react";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import fetchDataPost from "../service/fetchDataPost";
import { validateCreateperson } from "../constants/schemas";
import getMapInputs from "../service/getMapInputs";
import {
  createObjPerson,
  createPersonDataFetch,
  objsFetch,
} from "../constants/dataFetchs";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";

const CreatePerson = ({setLoading}) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataAddress, setDataAddress] = useState(null);
  const [dataTypes, setDataTypes] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = [
      "inNombrePersona",
      "inApellidoPersona",
      "inNumeroPersona",
      "inDireccionPersona",
      "inTipoPersona",
    ];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateCreateperson({ data });
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = createPersonDataFetch({ data });

    //Si no hay error llmamos al servicio
    const obj = createObjPerson({ dataFetch });

    const resultService = await fetchDataPost({...obj, setLoading});

    if(resultService?.errorSession) setIsErrorSession(true)

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);

    } else if (!resultService) {
      setDataModal("No se creo la persona");
      setIsModalVisible(true);

    } else {
      setDataModal("Se creo la persona");
      setIsModalVisible(true);

    }
  };

  //Este fetch obtiene los valores que iran en los select
  useEffect(() => {
    const objAddress = objsFetch.objGetAllAddress;
    const objTypes = objsFetch.objGetAllTypesPerson;

    const handleFetch = async () => {
      const dataAd = await fetchDataPost({...objAddress, setLoading});
      const dataTy = await fetchDataPost({...objTypes, setLoading});

      if(dataAd?.errorSession || dataTy?.errorSession){
        console.log(dataAd, dataTy)
        setIsErrorSession(true)
      } 
      
      const dataAdMap = dataAd.map((item) => {
        return (
          <option value={item.id_address} key={item.id_address}>
            {item.de_address}
          </option>
        );
      });

      const dataTyMap = dataTy.map((item) => {
        return (
          <option value={item.id_tp_person} key={item.id_tp_person}>
            {item.de_tp_person}
          </option>
        );
      });

      setDataAddress(dataAdMap);
      setDataTypes(dataTyMap);
    };

    handleFetch();
  }, [dataModal]);

  //Este useEffect se encarga de setear los valores de los select
  useEffect(() => {
    if (!mapaInfo || !dataAddress || !dataTypes) return;

    mapaInfo
      .get("inDireccionPersona")
      .setInfo({ value: " ", options: dataAddress });

    mapaInfo.get("inTipoPersona").setInfo({ value: " ", options: dataTypes });

  }, [mapaInfo, dataAddress, dataTypes, dataModal, isModalVisible]);

  if(isErrorSession) return <ModalSession/>

  if(isModalVisible && dataModal) return <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal}/>

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Persona</h1>
        <MagicForms
          infoData={infoInputsBo.CreatePerson}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear" click={handleClick} />
      </div>
    </section>
  );
};

export default CreatePerson;
