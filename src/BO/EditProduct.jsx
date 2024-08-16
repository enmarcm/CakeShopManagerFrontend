import MagicForms from "../components/MagicForms";
import { useState, useEffect } from "react";
import infoInputsBo from "../constants/infoInputsBO";
import fetchDataPost from "../service/fetchDataPost";
import ButtonVe from "../components/ButtonVe";
import getMapInputs from "../service/getMapInputs";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import {
    editProductSaleDataFetch,
    editProductSaleObj,
    objsFetch,
    getPresentationByIdDataFetch,
    getPresentationByIdObj,
    getProductByIdPresentationDataFetch,
    getProductByIdPresentationObj,
    getAmountByProductDataFetch,
    getAmountByProductObj
} from '../constants/dataFetchs'

const EditProduct = ({ setLoading }) => {
    const [mapaInfo, setMapaInfo] = useState(null);
    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState(null);

    const [dataProducts, setDataProducts] = useState(null);
    const [dataIdProduct, setDataIdProduct] = useState(null);
    const [dataPresentacion, setDataPresentacion] = useState(null);
    const [dataIdPresentacion, setDataIdPresentacion] = useState(null);
    const [dataMonto, setDataMonto] = useState(null);

    const handleClick = async () => {
        const arrayInputs = ['inPresentacion', 'inMonto', 'inProducto']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        const dataFetch = editProductSaleDataFetch({ data })
        const obj = editProductSaleObj({ dataFetch })

        const result = await fetchDataPost({ ...obj, setLoading })
        if (result?.errorSession) setIsErrorSession(true);
        if (result?.error) {
            setDataModal(result.error);
            setIsModalVisible(true);
            return;
        }

        if (typeof result === "string") {
            setDataModal(result);
            setIsModalVisible(true);
        } else if (!result) {
            setDataModal("No se edito correctamente el product");
            setIsModalVisible(true);
        } else {
            setDataModal("El producto fue editado correctamente");
            setIsModalVisible(true);
        }

    }

    //Buscar productos
    useEffect(() => {
        const objProducts = objsFetch.objGetAllProductSale;
        const getAllProducts = async () => {
            const data = await fetchDataPost({ ...objProducts, setLoading })
            if (data?.errorSession) setIsErrorSession(true)

            console.log('Products', data)
            const dataMap = data.map(item => {
                return (
                    <option value={item.id_product_sale} key={item.id_product_sale}>
                        {item.de_product}
                    </option>
                )
            })
            setDataProducts(dataMap)
        }
        getAllProducts();
    }, [])
    //Buscar productos por presentacion
    // useEffect(() => {
    //     if (!dataIdPresentacion) return;
    //     const arrayInputs = ['inPresentacion']
    //     const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
    //     const dataFetch = getProductByIdPresentationDataFetch({ data })
    //     const obj = getProductByIdPresentationObj({ dataFetch })
    //     const getAllProducts = async () => {
    //         const products = await fetchDataPost({ ...obj, setLoading })
    //         if (products?.errorSession) setIsErrorSession(true)

    //         console.log('PRODUCTS', products);
    //         const productsMap = products.map(item => {
    //             return (
    //                 <option value={item.id_product} key={item.id_product}>
    //                     {item.de_product}
    //                 </option>
    //             )
    //         })
    //         setDataProducts(productsMap);
    //     }

    //     getAllProducts();
    // }, [dataIdPresentacion])
    //Cargar productos en los select
    useEffect(() => {
        if (!mapaInfo || !dataProducts) return;

        mapaInfo.get('inProducto').setInfo({
            value: '',
            options: dataProducts
        })

    }, [mapaInfo, dataProducts])

    //Buscar presentaciones
    useEffect(() => {
        const objPresentations = objsFetch.objGetAllPresentation;
        const getAllPresentation = async () => {
            const data = await fetchDataPost({ ...objPresentations, setLoading })
            if (data?.errorSession) setIsErrorSession(true);
            console.log('PRESENTACION', data);
            const dataMap = data.map(item => {
                return (
                    <option value={item.id_presentation} key={item.id_presentation}>
                        {item.de_presentation}
                    </option>
                )
            })
            setDataPresentacion(dataMap)
        }

        getAllPresentation();
    }, [])

    //Buscar presentacion por producto
    useEffect(() => {
        if (!dataIdProduct) return;
        const arrayInputs = ['inProducto']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        const dataFetch = getPresentationByIdDataFetch({ data })
        const obj = getPresentationByIdObj({ dataFetch })

        const getAllPresentation = async () => {
            const presentation = await fetchDataPost({ ...obj, setLoading })
            if (presentation?.errorSession) setIsErrorSession(true)

            console.log('PRESENTACION', presentation);
            const presentationMap = presentation.map(item => {
                return (
                    <option value={item.id_presentation} key={item.id_presentation}>
                        {item.de_presentation}
                    </option>
                )
            })
            setDataPresentacion(presentationMap)
        }
        getAllPresentation();
    }, [dataIdProduct])



    //Cargar Presentaciones
    useEffect(() => {
        if (!mapaInfo || !dataPresentacion) return;

        mapaInfo.get('inPresentacion').setInfo({
            value: '',
            options: dataPresentacion
        })

    }, [mapaInfo, dataPresentacion])


    //Buscar monto de producto
    useEffect(() => {
        if (!dataIdProduct) return;

        const arrayInputs = ['inProducto']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        const dataFetch = getAmountByProductDataFetch({ data })
        const obj = getAmountByProductObj({ dataFetch })
        const getAmount = async () => {
            const amount = await fetchDataPost({ ...obj, setLoading })
            if (amount?.errorSession) setIsErrorSession(true);

            console.log('Aqui monto del producto', amount)
            setDataMonto(Number(amount))
        }

        getAmount();
    }, [dataIdProduct])

    //Cargar monto
    useEffect(() => {
        if (!mapaInfo || !dataMonto) return;

        mapaInfo.get('inMonto').setInfo({
            value: dataMonto,
            options: ''
        })

    }, [mapaInfo, dataMonto])

    //OnChange(presentacion y productos y monto)
    const handleChangeIdProduct = (e) => {
        const idProduct = e.target.value;

        if (idProduct === '') return;

        setDataIdProduct(idProduct);
    }

    const handleChangeIdPresentation = (e) => {
        const idPresentation = e.target.value;
        if (idPresentation === '') return;

        setDataIdPresentacion(idPresentation)
    }

    const eventHandlers = {
        inProducto: handleChangeIdProduct,
        inPresentacion: handleChangeIdPresentation
    }

    if (isErrorSession) return <ModalSession />;
    if (isModalVisible && dataModal)
        return (
            <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />
        );
    return (
        <section className='container-magic-forms'>
            <div className="container-form-magic">
                <h1>Editar producto a la venta</h1>
                <MagicForms
                    infoData={infoInputsBo.editProducSale}
                    mapaInfo={setMapaInfo}
                    eventHandlers={eventHandlers}
                />
                <ButtonVe content={"Enviar"} click={handleClick} />
            </div>
        </section>
    )
}

export default EditProduct;
