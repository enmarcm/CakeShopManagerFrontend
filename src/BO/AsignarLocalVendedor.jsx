import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import infoInputsBo from '../constants/infoInputsBo';
import {
  objsFetch,
  getLocalsByRouteDataFetch,
  getLocalsByRouteObj,
  createAsignLocalSellerDataFetch,
  createAsignLocalSellerObj,
} from "../constants/dataFetchs";

const AsignarLocalVendedor = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataSellers, setDataSellers] = useState(null);
  const [dataRoutes, setDataRoutes] = useState(null);
  const [dataLocals, setDataLocals] = useState(null);
  const [dataIdSeller, setDataIdSeller] = useState(null);
  const [dataIdRoute, setDataIdRoute] = useState(null);
  const [dataIdLocal, setDataIdLocal] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inVendedor", "inRuta", "inLocal"];
    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
    console.log(data)

    const dataFetch = createAsignLocalSellerDataFetch({ data });

    //Aqui tengo que verificar la informacion con el schema
    const obj = createAsignLocalSellerObj({ dataFetch });

    const resultService = await fetchDataPost({ ...obj, setLoading });

    if (resultService?.errorSession) setIsErrorSession(true);
    if (resultService?.error) {
      setDataModal(resultService.error);
      setIsModalVisible(true);
      return;
    }

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
    } else if (!resultService) {
      setDataModal("No se asigno el local");
      setIsModalVisible(true);
    } else {
      setDataModal("Se asigno el local");
      setIsModalVisible(true);
    }
  };

  const handleChangeSellers = (e) => {
    const idSeller = e.target.value;
    if (idSeller === "") {
      setDataIdSeller("");
      setDataIdRoute("");
      setDataIdLocal("");
      return;
    }
    setDataIdSeller(idSeller);
  };

  const handleChangeRoutes = (e) => {
    const idRoute = e.target.value;
    if (idRoute === "") {
      //   setDataIdRoute("");
      //   setDataIdLocal("");
      //   setDataRoutes(null)
      setDataLocals(null);
      return;
    }
    setDataIdRoute(idRoute);
  };

  const eventHandlers = {
    inVendedor: handleChangeSellers,
    inRuta: handleChangeRoutes,
  };

  //Obtener los vendedores disponibles
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
          >{`${item.na_person.toUpperCase()} ${item.ln_person.toUpperCase()}`}</option>
        );
      });

      setDataSellers(dataSeMap);
    };
    handleFetch();
  }, []);

  //Colocar los vendedores en el select
  useEffect(() => {
    if (!mapaInfo || !dataSellers) return;
    mapaInfo.get("inVendedor").setInfo({ value: "", options: dataSellers });
  }, [mapaInfo, dataSellers]);

  //Obtener las rutas disponibles
  useEffect(() => {
    const objRoute = objsFetch.objGetAllRoutes;
    const handleFetch = async () => {
      const dataRt = await fetchDataPost({ ...objRoute, setLoading });
      if (dataRt?.errorSession) setIsErrorSession(true);

      const dataRtMap = dataRt.map((item) => {
        return (
          <option value={item.id_route} key={item.id_route}>
            {item.de_route.toUpperCase()}
          </option>
        );
      });
      setDataRoutes(dataRtMap);
    };
    handleFetch();
  }, []);

  //Colocar las rutas en el select
  useEffect(() => {
    if (!mapaInfo || !dataRoutes) return;
    mapaInfo.get("inRuta").setInfo({ value: "", options: dataRoutes });
  }, [mapaInfo, dataRoutes]);

  //Obtener los locales disponibles segun la ruta
  useEffect(() => {
    if (!dataIdRoute || !mapaInfo) return;

    const handleFetch = async () => {
      const dataFetch = getLocalsByRouteDataFetch({
        data: { idRoute: dataIdRoute },
      });

      const obj = getLocalsByRouteObj({ dataFetch });

      const result = await fetchDataPost({ ...obj, setLoading });

      if (result?.errorSession) setIsErrorSession(true);

      const dataMap = result.map((item) => {
        return (
          <option value={item.id_local} key={item.id_local}>
            {item.de_local.toUpperCase()}
          </option>
        );
      });

      setDataLocals(dataMap);
    };

    handleFetch();
  }, [dataIdRoute]);

  //Colocar los locales en el select
  useEffect(() => {
    if (!mapaInfo) return;
    mapaInfo.get("inLocal").setInfo({ value: "", options: dataLocals });
  }, [mapaInfo, dataLocals, dataRoutes]);

  if (isErrorSession) return <ModalSession />;
  if (isModalVisible && dataModal)
    return (
      <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />
    );

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Asignar Local a vendedor</h1>

        <MagicForms
          infoData={infoInputsBo.AsignarLocalVendedor}
          mapaInfo={setMapaInfo}
          eventHandlers={eventHandlers}
        />

        <ButtonVe content={"Enviar"} click={handleClick} />
      </div>
    </section>
  );
};

export default AsignarLocalVendedor;
