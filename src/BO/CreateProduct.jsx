import { useEffect, useState } from "react";
import MagicForms from "../components/MagicForms";
import infoInputsBo from "../constants/infoInputsBO";
import ButtonVe from "../components/ButtonVe";
import getMapInputs from "../service/getMapInputs";
import { validateCreateProduct } from "../constants/schemas";
import {
  createObjProduct,
  createProductDataFetch,
} from "../constants/dataFetchs";
import fetchDataPost from "../service/fetchDataPost";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";

const CreateProduct = ({ setLoading }) => {
  const [mapaInfo, setMapaInfo] = useState(null);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const handleClick = async () => {
    const arrayInputs = ["inDescripcionProducto"];
    const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
    const result = await validateCreateProduct({ data });
    if (result?.error)
      return console.log(`Existio un error en CreateProduct: ${result.error}`);

    const dataFetch = createProductDataFetch({ data });

    const obj = createObjProduct({ dataFetch });
    console.log(obj);

    const resultService = await fetchDataPost({ ...obj, setLoading });
    if (resultService?.errorSession) setIsErrorSession(true);

    if (typeof resultService === "string") {
      setDataModal(resultService);
      setIsModalVisible(true);
    } else if (!resultService) {
      setDataModal("No se creo el producto");
      setIsModalVisible(true);
    } else {
      setDataModal("Se creo el producto");
      setIsModalVisible(true);
    }
  };

  if (isErrorSession) return <ModalSession />;

  if(isModalVisible && dataModal) return <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />

  return (
    <section className="container-magic-forms">
      <div className="container-form-magic">
        <h1>Crear Producto</h1>
        <MagicForms
          infoData={infoInputsBo.CreateProduct}
          mapaInfo={setMapaInfo}
        />

        <ButtonVe content="Crear" click={handleClick} />
      </div>
    </section>
  );
};

export default CreateProduct;
