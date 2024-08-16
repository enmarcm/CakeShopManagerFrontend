import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import infoInputsBo from "../constants/infoInputsBO";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import { objsFetch, createAsignSalaryDataFetch, createAsignSalaryObj } from "../constants/dataFetchs";
import { validateAsignSalary } from "../constants/schemas";

const AsignarSalarioVendedor = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [dataSellers, setDataSellers] = useState(null);
  const [dataIdPerson, setDataIdPerson] = useState(null);
  const [dataTypesSalary, setDataTypesSalary] = useState(null);
  const [dataIdTypeSalary, setDataIdTypeSalary] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async() =>{
    const arrayInputs = ['inVendedor', 'inTipoSalario']

    const data = getMapInputs({mapaInfo, idInputs: arrayInputs})

    const result = await validateAsignSalary({data})
    if (result?.error){
        setDataModal(result.error)
        setIsModalVisible(true)
        return
    }

    const dataFetch = createAsignSalaryDataFetch({ data });
    if (dataFetch?.info){
        setDataModal(dataFetch.info)
        setIsModalVisible(true)
        return
    }

    const obj = createAsignSalaryObj({ dataFetch });
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
        }
    else if(!resultService){
        setDataModal("No se asigno el salario");
        setIsModalVisible(true);
    }else{
        setDataModal("Se asigno el salario");
        setIsModalVisible(true);
    }
  }

  //Obtener los vendedores
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

  //Ahora tengo que obtener los tipos de pago disponibles
  useEffect(() => {
    const objTypesSalary = objsFetch.objGetAllTypesSalary;

    const handleFetch = async () => {
      const dataSala = await fetchDataPost({ ...objTypesSalary, setLoading });
      if (dataSala?.errorSession) setIsErrorSession(true);

      const dataSalaMap = dataSala.map((item) => {
        return (
          <option
            value={item.id_tp_salary}
            key={item.id_tp_salary}
          >{`${item.de_tp_salary}`}</option>
        );
      });

      setDataTypesSalary(dataSalaMap);
    };

    handleFetch();
  }, []);

  //Ahora este los coloca en el select
  useEffect(() => {
    if (!mapaInfo || !dataTypesSalary) return;

    mapaInfo.get("inTipoSalario").setInfo({ value: "", options: dataTypesSalary });
  }, [mapaInfo, dataTypesSalary, dataModal]);

  if (isErrorSession) return <ModalSession />;
  if (isModalVisible && dataModal)
    return <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />;

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Asignar tipo de salario vendedor</h1>

        <MagicForms
          infoData={infoInputsBo.AsignarSalario}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content={"Enviar"} click={handleClick} />

      </div>
    </section>
  );
};

export default AsignarSalarioVendedor;
