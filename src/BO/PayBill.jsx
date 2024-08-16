import { useState, useEffect } from "react";
import getMapInputs from "../service/getMapInputs";
import fetchDataPost from "../service/fetchDataPost";
import infoInputsBo from "../constants/infoInputsBo";
import MagicForms from "../components/MagicForms";
import ButtonVe from "../components/ButtonVe";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import useURLParams from "../customHooks/useURLParams";
import {
    objsFetch,
    asingPayToBillDataFetch,
    asingPayToBillObj,
    getAmountObj,
    getAmoutDataFetch
} from '../constants/dataFetchs'

const dataTypePay = [
    { id: 1, name: 'Banco' },
    { id: 2, name: 'Otros' }
]

const AsingPayToBill = ({ setLoading }) => {
    const { id } = useURLParams().params;
    const [mapaInfo, setMapaInfo] = useState(null);
    const [idBill, setIdBill] = useState(null);
    const [dataTipoPago, setDataTipoPago] = useState(null);
    const [dataIdTipoPago, setIdTipoPago] = useState(null);
    const [dataMetodoPago, setDataMetodoPago] = useState(null);
    const [dataBank, setDataBanco] = useState(null);
    const [dataMonto, setDataMonto] = useState(null);
    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState(null);


    const handleClick = async () => {

        const arrayInputs = ['inTipoPago', 'inMetodo', 'inBanco', 'inMonto'];
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

        const dataFetch = asingPayToBillDataFetch({ idBill, data })
        const obj = asingPayToBillObj({ dataFetch })

        const result = await fetchDataPost({ ...obj, setLoading })

        setIdBill(null);
        setDataMonto(null);

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
            setDataModal("No se pudo asignar el pago a la factura");
            setIsModalVisible(true);
        } else {
            setDataModal("Se asigno correctamente el pago a la factura");
            setIsModalVisible(true);
        }

    }

    useEffect(() => {
        if (!mapaInfo) return;
        if (!id) {
            mapaInfo.get('inFactura').setIsReadOnly(false)
            return;
        };
        console.log('Aqui el id si es que hay', id);

        mapaInfo.get('inFactura').setIsReadOnly(true)
        mapaInfo.get('inFactura').setInfo({
            value: id,
            options: ''
        })
        //Hacer aqui readOnlyTrue
    }, [id, mapaInfo])

    useEffect(() => {
        if (!mapaInfo) return;

        mapaInfo.get('inBanco').setIsNotVisible(true)
        mapaInfo.get('inMetodo').setIsNotVisible(true)

    }, [mapaInfo])

    useEffect(() => {
        if (!idBill) return;

        const arrayInputs = ['inFactura'];
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs });

        const dataFetch = getAmoutDataFetch({ data })
        const obj = getAmountObj({ dataFetch })

        const getMonto = async () => {
            const monto = await fetchDataPost({ ...obj, setLoading })

            if (monto?.errorSession) setIsErrorSession(true);

            if (!monto || monto.error) return console.error('monto', monto);

            console.log('Aqui el monto', monto);
            setDataMonto(monto)
        }
        getMonto();
    }, [idBill])


    //Cargar monto
    useEffect(() => {
        if (!mapaInfo || !idBill) return;

        mapaInfo.get('inMonto').setInfo({
            value: dataMonto ?? '',
            options: ''
        })

    }, [mapaInfo, idBill])

    //Cargar metodos de pago
    useEffect(() => {
        if (!mapaInfo || !dataMetodoPago) return;

        mapaInfo.get('inMetodo').setInfo({
            value: '',
            options: dataMetodoPago
        })

    }, [mapaInfo, dataMetodoPago])

    useEffect(() => {
        const tipoPago = dataTypePay.map(item => {
            return (
                <option value={item.id} key={item.id}>
                    {item.name}
                </option>
            )
        })

        setDataTipoPago(tipoPago)
    }, [])

    //Cargar tipos de pagos
    useEffect(() => {
        if (!mapaInfo || !dataTipoPago) return;

        mapaInfo.get('inTipoPago').setInfo({
            value: '',
            options: dataTipoPago
        })
    }, [mapaInfo, dataTipoPago])

    useEffect(() => {
        if (!dataIdTipoPago) return;
        const objBank = objsFetch.objGetAllBanksActive;

        const getAllBank = async () => {
            const data = await fetchDataPost({ ...objBank, setLoading })

            const dataMap = data.map(item => {
                return (
                    <option value={item.id_bank} key={item.id_bank}>
                        {item.de_bank}
                    </option>
                )
            })

            setDataBanco(dataMap)
        }

        getAllBank();
    }, [dataIdTipoPago])

    //Cargar select de los tipos de banco
    useEffect(() => {
        if (!mapaInfo || !dataBank) return;

        mapaInfo.get('inBanco').setInfo({
            value: '',
            options: dataBank
        })

    }, [mapaInfo, dataBank])

    //Cargar select segun el id del tipo de pago que este seleccionado
    useEffect(() => {
        if (!dataIdTipoPago || !mapaInfo) return;
        const objMethod = dataIdTipoPago === 1 ? objsFetch.objGetAllMethodBank : objsFetch.objGetAllMethodOther
        const getMethods = async () => {
            const data = await fetchDataPost({ ...objMethod, setLoading })

            console.log('Aqui data en metodos', data)
            if (data?.errorSession) setIsErrorSession(true);

            const dataMap = data.map(item => {
                return (
                    <option value={item.id} key={item.id}>
                        {item.descripcion}
                    </option>
                )
            })
            setDataMetodoPago(dataMap)
        }
        getMethods();
    }, [dataIdTipoPago])

    //!Aqui se tiene que ocultar que mostrar o dejar oculto el tipo de banco
    const handleChangeTipoPago = (e) => {
        const idTipoPago = e.target.value;
        if (idTipoPago == 1) {
            setIdTipoPago(1);
            mapaInfo.get('inBanco').setIsNotVisible(false)
            mapaInfo.get('inMetodo').setIsNotVisible(false)
            return;
        }
        mapaInfo.get('inBanco').setIsNotVisible(true)
        mapaInfo.get('inMetodo').setIsNotVisible(false)
        setIdTipoPago(2)
        return;
    }

    const handleChangeIdBill = (e) => {
        const idBill = e.target.value;
        if (idBill === '') {
            return;
        }

        setIdBill(Number(idBill));
    }

    const eventHandlers = {
        inTipoPago: handleChangeTipoPago,
        inFactura: handleChangeIdBill
    }

    if (isErrorSession) return <ModalSession />;
    if (isModalVisible && dataModal)
        return (
            <ModalBase setIsModalVisible={setIsModalVisible} content={dataModal} />
        );
    return (
        <section className='container-magic-forms'>
            <div className="container-form-magic">
                <h1>Pagar</h1>
                <MagicForms
                    infoData={infoInputsBo.payBill}
                    mapaInfo={setMapaInfo}
                    eventHandlers={eventHandlers}
                />
                <ButtonVe content={"Procesar pago"} click={handleClick} />
            </div>
        </section>
    )
}

export default AsingPayToBill;