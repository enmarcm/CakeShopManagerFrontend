import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import {
  changeStatusSellerDataFetch,
  changeStatusSellerObj,
  getSellerByIdObj,
  objsFetch,
  getSellerByIdDataFetch,
} from "../constants/dataFetchs";
import infoInputsBo from '../constants/infoInputsBo';
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import { validateChangeStatusSeller } from "../constants/schemas";

const ChangeStatusSeller = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataSellers, setDataSellers] = useState(null);
  const [dataIdSeller, setDataIdSeller] = useState(null); //Este es el id del vendedor que se selecciono en el select
  const [dataStatus, setDataStatus] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inVendedor", "inEstadoVendedor", "inCambiarEstado"];

    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
    console.log(data)

    const result = await validateChangeStatusSeller({ data })
    if (result?.error) return console.log(`Existio un error: ${result.error}`);

    const dataFetch = changeStatusSellerDataFetch({ data });
    if (dataFetch?.info) return console.log("No se cambia estado");
    const obj = changeStatusSellerObj({ dataFetch });

    const resultService = await fetchDataPost({ ...obj, setLoading });

    if (resultService?.errorSession) setIsErrorSession(true);

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
      setDataStatus(null);
      setDataIdSeller(null);
    } else {
      setDataModal("Se cambio el estado del vendedor");
      setIsModalVisible(true);
      setDataStatus(null);
      setDataIdSeller(null);
    }
  };

  const handleChangeSelect = (e) => {
    const idSeller = e.target.value;

    if (idSeller === "") {
      setDataIdSeller("");
      setDataStatus("Seleccione");
      return;
    }

    // Aquí debo obtener la información de ese vendedor
    setDataIdSeller(idSeller);
  };

  const eventHandlers = {
    inVendedor: handleChangeSelect,
  };

  //Este fetch obtiene los valores de los vendedores que iran en el select
  useEffect(() => {
    const objSellers = objsFetch.objGetAllSellers;

    const handleFetch = async () => {
      const dataSe = await fetchDataPost({ ...objSellers, setLoading });
      if (dataSe?.errorSession) setIsErrorSession(true);

      const dataSeMap = dataSe.map((item) => {
        return (
          <option
            value={item.id_person}
            key={item.id_person}
          >{`${item.na_person} ${item.ln_person}`}</option>
        );
      });

      setDataSellers(dataSeMap);
    };

    handleFetch();
  }, []);

  //Ahora este los coloca en el select
  useEffect(() => {
    if (!mapaInfo || !dataSellers) return;

    mapaInfo.get("inVendedor").setInfo({ value: "", options: dataSellers });
  }, [mapaInfo, dataSellers, dataModal]);

  //Este se encargara de obtener la informacion del vendedor
  useEffect(() => {
    if (!dataIdSeller) return;

    const handleEffect = async () => {
      const dataFetch = getSellerByIdDataFetch({
        data: { idSeller: dataIdSeller },
      });
      const obj = getSellerByIdObj({ dataFetch });
      const result = await fetchDataPost({ ...obj, setLoading });
      if (result?.errorSession) setIsErrorSession(true);

      const status = result[0].de_status_user;
      setDataStatus(status);
    };

    handleEffect();
  }, [dataIdSeller]);

  //De setear cuando cambiara el estado del vendedor
  useEffect(() => {
    if (!dataStatus) return;

    mapaInfo
      .get("inEstadoVendedor")
      .setInfo({ value: dataStatus, options: dataStatus });
  }, [dataStatus]);

  if (isErrorSession) return <ModalSession />;

  if (isModalVisible && dataModal)
    return (
      <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />
    );

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Cambiar estado vendedor</h1>
        <MagicForms
          infoData={infoInputsBo.ChangeStatusSeller}
          mapaInfo={setMapaInfo}
          eventHandlers={eventHandlers}
        />

        <ButtonVe content="Cambiar" click={handleClick} />
      </div>
    </section>
  );
};

export default ChangeStatusSeller;
