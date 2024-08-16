import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import {
  createObjRoute,
  createRouteDataFetch,
  objsFetch,
} from "../constants/dataFetchs";
import MagicForms from "../components/MagicForms";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import fetchDataPost from "../service/fetchDataPost";
import { validateCreateRoute } from "../constants/schemas";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";

const CreateRoute = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataStreet, setDataStreet] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inNombreRuta", "inCalleAsociada"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateCreateRoute({ data });
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = createRouteDataFetch({ data });

    const obj = createObjRoute({ dataFetch });

    const resultService = await fetchDataPost({ ...obj, setLoading });
    if (resultService?.errorSession) setIsErrorSession(true);

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
    } else if (!resultService) {
      setDataModal("No se creo la ruta");
      setIsModalVisible(true);
    } else {
      setDataModal("Se creo la ruta");
      setIsModalVisible(true);
    }
  };

  //Obtener valores de las calles
  useEffect(() => {
    const objStreets = objsFetch.objGetAllStreet;

    const handleFetch = async () => {
      const dataSt = await fetchDataPost({ ...objStreets, setLoading });
      if (dataSt?.errorSession) setIsErrorSession(true);

      const dataStMap = dataSt.map((item) => {
        return (
          <option value={item.id_street} key={item.id_street}>
            {item.na_street}
          </option>
        );
      });

      setDataStreet(dataStMap);
    };

    handleFetch();
  }, []);

  //Settear en los select valores de las calles
  useEffect(() => {
    if (!mapaInfo || !dataStreet) return;

    mapaInfo.get("inCalleAsociada").setInfo({ value: "", options: dataStreet });
  }, [mapaInfo, dataStreet, isModalVisible]);

  if (isErrorSession) return <ModalSession />;

  if(isModalVisible && dataModal) return <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Ruta</h1>
        <MagicForms
          infoData={infoInputsBo.CreateRoute}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear Ruta" click={handleClick} />
      </div>
    </section>
  );
};

export default CreateRoute;
