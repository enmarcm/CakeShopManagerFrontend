import { lazy } from 'react'

import { useEffect, useState } from "react";
import DefaultComponent from "./DefaultComponent";
import ComponentTable from "./Table";
import pathInfo from "../constants/reportsInfo";
import useURLParams from "../customHooks/useURLParams";
import fetcho from "../service/fetcho";
import ModalSession from "./ModalSession";
import ModalBase from './ModalBase';

const ButtonReports = lazy(() => import("./ButtonReports"));

const getModuleAndObjectByPath = (typeFilter) => {
  try {
    const route = pathInfo.find((config) => config.path === typeFilter);
    // // console.log("Aqui Route", route);
    if (!route) {
      return { module: "default", object: "default", options: "default" };
    } //No encontro esa ruta
    const { module, object, options } = route;
    return { module, object, options };
  } catch (error) {
    console.error(
      `Hubo un error al buscar en un arreglo de objeto en el customHook de useUrlParams: ${error.message}`
    );
    return false;
  }
};

const MyRoute = ({ setLoading }) => {
  const [data, setData] = useState(null);
  const [optionsData, setOptions] = useState({});
  const [isMain, setIsMain] = useState(true);
  const [defaultComponent, setDefaultComponent] = useState(false);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, setDataModal] = useState('');

  const { params } = useURLParams();

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      try {
        const verifyMain = params["main"];

        const { module, object, options } = getModuleAndObjectByPath(
          params.filter
        );

        if (module === "default") {
          setDefaultComponent(true);
          console.log("default");
          return;
        }

        // console.log(
        //   "Params",
        //   params,
        //   module,
        //   object,
        //   params.method,
        //   params.params,
        //   "Aqui tipo de params",
        //   params.typeParams
        // );
        if (!verifyMain) {
          const prueba = params["typeParams"].reduce((acc, name, index) => {
            acc[name] = params["params"][index];
            return acc;
          }, {});

          setLoading(true);
          const response = await fetcho({
            url: "/toProcess",
            method: "POST",
            body: {
              area: module,
              object: object,
              method: params.method,
              params: prueba,
            },
          });
          console.log('HOLAAAA', response)
          setLoading(false);
          if (response?.errorSession) setIsErrorSession(true);
          if (response?.error) {
            setDataModal(response.error)
            setIsModalOpen(true)
            return
          }

          setData({
            response: response,
            module,
            object,
            context: params["context"],
          });
          setIsMain(false);
          return;
        }
        setOptions({ options });
        setLoading(false);
        return;
      } catch (error) {
        console.error(
          `Hubo un error al realizar un fetch o cargar las opciones en el componente myRoute: ${error.message}`
        );
      }
    };

    if (params.filter) {
      fetchDataAndSetData();
    }
  }, [params]);

  if (isErrorSession) return <ModalSession />;
  if (isModalOpen) return <ModalBase setIsModalVisible={setIsModalOpen} content={JSON.stringify(dataModal)} />

  return (
    <div className="container-all-reports" style={{ width: "100%" }}>
      {defaultComponent ? (
        <DefaultComponent />
      ) : isMain ? (
        <ButtonReports optionByPath={optionsData} setLoading={setLoading} />
      ) : (
        <ComponentTable data={data} />
      )}
    </div>
  );
};

export default MyRoute;
