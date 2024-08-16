import MagicForms from "../components/MagicForms";
import { useState, useEffect } from "react";
import infoInputsBo from "../constants/infoInputsBO";
import fetchDataPost from "../service/fetchDataPost";
import ButtonVe from "../components/ButtonVe";
import getMapInputs from "../service/getMapInputs";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import {
  getPersonDataFetch,
  getPersonObj,
  objsFetch,
} from "../constants/dataFetchs";
import { editPersonDataFetch, editPersonObj } from "../constants/dataFetchs";
import { validateEditPerson } from "../constants/schemas";

const EditPerson = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const [dataPersons, setDataPersons] = useState(null);
  const [dataAddress, setDataAddress] = useState(null);
  const [dataIdPerson, setDataIdPerson] = useState(null);
  const [dataName, setDataName] = useState(null);
  const [dataLastName, setDataLastName] = useState(null);
  const [dataNumber, setDataNumber] = useState(null);
  const [dataAddressPerson, setDataAddressPerson] = useState(null);

  const handleChangePerson = (e) => {
    const idPerson = e.target.value;

    if (idPerson === "") {
      setDataName(null);
      setDataLastName(null);
      setDataNumber(null);
      setDataAddressPerson(null);
      return;
    }
    setDataIdPerson(idPerson);
  };

  const handleClick = async () => {
    const arrayInputs = [
      "inPersonas",
      "inNombrePersona",
      "inApellidoPersona",
      "inNumeroPersona",
      "inDireccionPersona"
    ];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateEditPerson({ data });
    if (result?.error) {
      setDataModal(result.error);
      setIsModalVisible(true);
      return;
    }

    const dataFetch = editPersonDataFetch({ data });

    //Si no hay error llmamos al servicio
    const obj = editPersonObj({ dataFetch });

    const resultService = await fetchDataPost({ ...obj, setLoading });

    if (resultService?.errorSession) setIsErrorSession(true);

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
    } else if (!resultService) {
      setDataModal("No se actualizo la persona");
      setIsModalVisible(true);
    } else {
      setDataModal("Se actualizo la persona");
      setIsModalVisible(true);
    }
  };

  const eventHandlers = {
    inPersonas: handleChangePerson,
  };

  //Obtener los datos de las personas
  useEffect(() => {
    const objGetAllPersons = objsFetch.objGetAllPersons;

    const handleFetch = async () => {
      const dataPersons = await fetchDataPost({
        ...objGetAllPersons,
        setLoading,
      });

      if (dataPersons?.errorSession) {
        setIsErrorSession(true);
      }

      const dataPersonsMap = dataPersons.map((item) => {
        return (
          <option value={item.id_person} key={item.id_person}>
            {`${item.na_person.toUpperCase()} ${item.ln_person.toUpperCase()}`}
          </option>
        );
      });

      setDataPersons(dataPersonsMap);
    };

    handleFetch();
  }, [dataModal, isModalVisible]);

  //Setear datos personas en select de personas
  useEffect(() => {
    if (!dataPersons) return;

    mapaInfo.get("inPersonas").setInfo({ value: "", options: dataPersons });
  }, [dataPersons]);

  //Obtener localidades disponibles
  useEffect(() => {
    const objAddress = objsFetch.objGetAllAddress;

    const handleFetch = async () => {
      const dataAd = await fetchDataPost({ ...objAddress, setLoading });

      if (dataAd?.errorSession) {
        setIsErrorSession(true);
      }

      const dataAdMap = dataAd.map((item) => {
        return (
          <option value={item.id_address} key={item.id_address}>
            {item.de_address}
          </option>
        );
      });

      setDataAddress(dataAdMap);
    };

    handleFetch();
  }, [dataModal, isModalVisible]);

  useEffect(() => {
    if (!mapaInfo || !dataAddress) return;

    mapaInfo
      .get("inDireccionPersona")
      .setInfo({ value: " ", options: dataAddress });
  }, [mapaInfo, dataAddress, dataModal, isModalVisible]);

  //Cuando cambie idPerson, buscar la informacion de esa persona
  useEffect(() => {
    if (!dataIdPerson) return;

    const data = {
      idPerson: dataIdPerson,
    };

    const dataFetch = getPersonDataFetch({ data });

    const obj = getPersonObj({ dataFetch });

    const handleFetch = async () => {
      const [data] = await fetchDataPost({ ...obj, setLoading });

      if (data?.errorSession) setIsErrorSession(true);

      if (!data) return;

      setDataName(data.na_person);
      setDataLastName(data.ln_person);
      setDataNumber(data.nu_person);
      setDataAddressPerson(data.id_address);
    };

    handleFetch();
  }, [dataIdPerson]);

  //Setear eso en los inputs
  useEffect(() => {
    if (
      !mapaInfo ||
      !dataName ||
      !dataLastName ||
      !dataNumber ||
      !dataAddressPerson
    )
      return;

    mapaInfo.get("inNombrePersona").setInfo({ value: dataName });
    mapaInfo.get("inApellidoPersona").setInfo({ value: dataLastName });
    mapaInfo.get("inNumeroPersona").setInfo({ value: dataNumber });
    mapaInfo
      .get("inDireccionPersona")
      .setInfo({ value: dataAddressPerson, options: dataAddress });
  }, [dataName, dataLastName, dataNumber, dataAddressPerson]);

  if (isErrorSession) return <ModalSession />;
  if (dataModal && isModalVisible)
    return (
      <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />
    );

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Editar Persona</h1>
        <MagicForms
          infoData={infoInputsBo.EditarPerson}
          mapaInfo={setMapaInfo}
          eventHandlers={eventHandlers}
        />

        <ButtonVe content="Enviar" click={handleClick} />
      </div>
    </section>
  );
};

export default EditPerson;
