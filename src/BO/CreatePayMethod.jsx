import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import {
  createPayMethodDataFetch,
  createObjPayMethod,
} from "../constants/dataFetchs";
import infoInputsBo from "../constants/infoInputsBo";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";
import fetchDataPost from "../service/fetchDataPost";
import ModalSession from "../components/ModalSession";
import { validateCreatePayMethod } from "../constants/schemas";
import ModalBase from "../components/ModalBase";

const dataTypesObj = [
  {
    id: 1,
    name: "Banco",
  },
  {
    id: 2,
    name: "Pago a banco",
  },
  {
    id: 3,
    name: "Pago a otro",
  },
];

const CreatePayMethod = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataTypes, setDataTypes] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inTipoMetodoPago", "inDescripcionMetodoPago"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

    const result = await validateCreatePayMethod({ data })
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = createPayMethodDataFetch({ data });
    const obj = createObjPayMethod({ dataFetch });
    const resultService = await fetchDataPost({ ...obj, setLoading });
    if (resultService?.errorSession) setIsErrorSession(true)

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
    } else if (!resultService) {
      setDataModal("No se creo el metodo de pago");
      setIsModalVisible(true);
    } else {
      setDataModal("Se creo el metodo de pago");
      setIsModalVisible(true);
    }

    console.log(resultService);
  };

  useEffect(() => {
    const dataTy = dataTypesObj.map((item) => {
      return (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      );
    });

    setDataTypes(dataTy);
  }, []);

  useEffect(() => {
    if (!mapaInfo || !dataTypes) return;
    mapaInfo.get("inTipoMetodoPago").setInfo({ value: "", options: dataTypes });
  }, [mapaInfo, dataTypes]);

  if (isErrorSession) return <ModalSession />

  if (dataModal && isModalVisible) return <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Metodo de Pago / Banco</h1>
        <MagicForms
          infoData={infoInputsBo.CreatePayMethod}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear" click={handleClick} />
      </div>
    </section>
  );
};

export default CreatePayMethod;
