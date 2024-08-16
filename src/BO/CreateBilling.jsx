import { useEffect, useState } from 'react'
import getMapInputs from '../service/getMapInputs'
import fetchDataPost from '../service/fetchDataPost'
import infoInputsBo from '../constants/infoInputsBo'
import MagicForms from '../components/MagicForms'
import ButtonVe from '../components/ButtonVe'
import ModalSession from '../components/ModalSession'
import ModalBase from '../components/ModalBase'
import getDateNow from '../service/getDateNow'
import {
    objsFetch,
    createBillingObj,
    createBillingDataFetch,
    getPresentationDataFetch,
    getPresentationObj
} from '../constants/dataFetchs'

const dataTypePay = [
    {
        id: 1,
        name: 'DE CONTADO'
    },
    {
        id: 2,
        name: 'CREDITO'
    }
]

const CreateBilling = ({ setLoading }) => {
    const [mapaInfo, setMapaInfo] = useState(null);
    const [dataTipoPago, setDataTipoPago] = useState(null);
    const [dataFechaLimite, setDataFechaLimite] = useState(null);
    const [dataProducts, setDataProducts] = useState(null);
    const [dataIdProduct, setDataIdProducts] = useState(null);
    const [dataSellers, setDataSellers] = useState(null);
    const [dataPersons, setDataPersons] = useState(null);
    const [dataModal, setDataModal] = useState(null);
    const [dataPresentaciones, setDataPresentaciones] = useState(null)
    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [arrayProducts, setArrayProducts] = useState([]);

    const handleClickProducts = () => {
        const idProduct = mapaInfo.get('inProducto').info['value']
        setArrayProducts([...arrayProducts, idProduct])

        console.log(`Se añadio el producto: ${idProduct}`)
    }

    const handleClickDeleteProduct = () => {
        const idProductDelete = mapaInfo.get('inProducto').info['value']
        const index = arrayProducts.findIndex((p) => p === idProductDelete);

        if (index !== -1) {
            const updatedItems = [...arrayProducts]
            updatedItems.splice(index, 1)

            setArrayProducts(updatedItems)
            console.log(`Se elimino el producto: ${idProductDelete}`)
        }
    }

    const handleClick = async () => {
        const arrayInputs = ['inVendedor', 'inCliente', 'inTipoPago', 'inFecha']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        const dataFetch = createBillingDataFetch({ arrayProducts, data })
        const obj = createBillingObj({ dataFetch })

        const result = await fetchDataPost({ ...obj, setLoading })
        console.log('Aqui resultado del fetch para insertar facturas', result);

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
            setDataModal("No se creo la nueva factura");
            setIsModalVisible(true);
        } else {
            setDataModal("Se creo la factura");
            setIsModalVisible(true);
        }
    }
    useEffect(() => {
        if (!mapaInfo) return;

        mapaInfo.get('inPresentacion').setIsNotVisible(true)
        mapaInfo.get('inFecha').setIsNotVisible(true)

    }, [mapaInfo])

    useEffect(() => {
        const objSellers = objsFetch.objGetAllSellers;

        const getAllSellers = async () => {
            const data = await fetchDataPost({ ...objSellers, setLoading });
            if (data?.errorSession) setIsErrorSession(true);

            const sellers = data.map((item) => {
                return (
                    <option
                        value={item.id_person}
                        key={item.id_person }
                    >{`${item.na_person.toUpperCase()} ${item.ln_person.toUpperCase()}`}</option>
                );
            });

            setDataSellers(sellers);
        };
        getAllSellers();
    }, []);

    //Cargar vendedores
    useEffect(() => {
        if (!mapaInfo || !dataSellers) return;

        mapaInfo.get('inVendedor').setInfo({
            value: '',
            options: dataSellers
        })

    }, [mapaInfo, dataSellers])

    //Obtener todas las personas
    useEffect(() => {
        const objPersons = objsFetch.objGetAllPerson;

        const getAllPersons = async () => {
            const data = await fetchDataPost({ ...objPersons, setLoading })

            if (data?.errorSession) setIsErrorSession(true)

            const dataMap = data.map(item => {
                return (
                    <option value={item.id_person} key={item.id_person}>
                        {`${item.na_person.toUpperCase()} ${item.ln_person.toUpperCase()}`}
                    </option>
                )
            })

            setDataPersons(dataMap);
        }
        getAllPersons();
    }, [])

    //Cargar todas las personas en el select
    useEffect(() => {
        if (!mapaInfo || !dataPersons) return;

        mapaInfo.get('inCliente').setInfo({
            value: '',
            options: dataPersons
        })

    }, [mapaInfo, dataPersons])

    useEffect(() => {
        const objProducts = objsFetch.objGetAllProductSale;
        const getAllProducts = async () => {
            const data = await fetchDataPost({ ...objProducts, setLoading })
            if (data?.errorSession) setIsErrorSession(true)

            console.log(data)
            const dataMap = data.map(item => {
                return (
                    <option value={item.id_product_sale} key={item.id_product_sale}>
                        {`${item.de_product.toUpperCase()} - ${item.de_presentation.toUpperCase()}`}
                    </option>
                )
            })
            setDataProducts(dataMap)
        }
        getAllProducts();
    }, [])

    //Cargar todos los productos en el select
    useEffect(() => {
        if (!mapaInfo || !dataProducts) return;

        mapaInfo.get('inProducto').setInfo({
            value: '',
            options: dataProducts
        })

    }, [mapaInfo, dataProducts])

    useEffect(() => {
        if (!dataIdProduct) return;

        const arrayInputs = ['inProducto'];
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });
        const dataFetch = getPresentationDataFetch({ data })
        const obj = getPresentationObj({ dataFetch })

        const getPresentation = async () => {
            const dataP = await fetchDataPost({ ...obj, setLoading })
            if (dataP?.errorSession) setIsErrorSession(true);

            console.log('Aqui la data de las presentaciones', dataP)
            const dataPMap = dataP.map(item => {
                return (
                    <option value={item.id_presentation} key={item.id_presentation}>
                        {item.de_presentation}
                    </option>
                )
            })

            setDataPresentaciones(dataPMap)
        }
        getPresentation();
    }, [dataIdProduct])

    //Cargar presentacion
    // useEffect(() => {
    //     if (!mapaInfo || !dataPresentaciones) return;

    //     mapaInfo.get('inPresentacion').setInfo({
    //         value: '',
    //         options: dataPresentaciones
    //     })

    // }, [mapaInfo, dataPresentaciones])

    useEffect(() => {
        const typePay = dataTypePay.map(obj => {
            return (
                <option value={obj.id} key={obj.id}>
                    {obj.name}
                </option>
            )
        })
        setDataTipoPago(typePay)
    }, [])
    //Cargar los dos tipos de pago
    useEffect(() => {
        if (!mapaInfo || !dataTipoPago) return;

        mapaInfo.get('inTipoPago').setInfo({
            value: "",
            options: dataTipoPago
        })

    }, [mapaInfo, dataTipoPago])

    //Cargar el input con la fecha limite
    useEffect(() => {
        if (!mapaInfo || !dataFechaLimite) return;

        mapaInfo.get('inFecha').setInfo({
            value: dataFechaLimite,
            options: dataFechaLimite
        })

    }, [mapaInfo, dataFechaLimite])

    const handleChangeIdProduct = (e) => {
        const idProduct = e.target.value;
        console.log('El id actual del producto es: ', idProduct)
        setDataIdProducts(Number(idProduct));
        // mapaInfo.get('inPresentacion').setIsNotVisible(false);
    }

    const handleChangeTipoPago = (e) => {
        const idTipoPago = e.target.value;
        if (idTipoPago == 2) {
            console.log('Paso aqui a decontado')
            setDataFechaLimite(getDateNow('mm/dd/yyyy', 12));
            return mapaInfo.get('inFecha').setIsNotVisible(false)
        }
        return mapaInfo.get('inFecha').setIsNotVisible(true)
    }

    const eventHandlers = {
        inTipoPago: handleChangeTipoPago,
        inProducto: handleChangeIdProduct
    }

    if (isErrorSession) return <ModalSession />;
    if (isModalVisible && dataModal)
        return (
            <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />
        );
    return (
        <section key={192} className='container-magic-forms'>
            <div className="container-form-magic">
                <h1>Crear Factura</h1>
                <MagicForms
                    infoData={infoInputsBo.CreateBilling}
                    mapaInfo={setMapaInfo}
                    eventHandlers={eventHandlers}
                />
                <ButtonVe key={1} content={"Enviar"} click={handleClick} />
                <ButtonVe key={2} content={"Add"} click={handleClickProducts} />
                <ButtonVe key={3} content={"Del"} click={handleClickDeleteProduct} />
            </div>
        </section>
    )
}

export default CreateBilling;