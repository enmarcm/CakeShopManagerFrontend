import MagicForms from "../components/MagicForms";
import { useState, useEffect } from "react";
import infoInputsBo from "../constants/infoInputsBO";
import fetchDataPost from "../service/fetchDataPost";
import ButtonVe from "../components/ButtonVe";
import getMapInputs from "../service/getMapInputs";
import ModalSession from "../components/ModalSession";
import ModalBase from "../components/ModalBase";
import {
    editLocalDataFetch,
    editLocalObj,
    objsFetch
} from '../constants/dataFetchs'
import { validateEditLocal } from '../constants/schemas'

const EditLocal = ({ setLoading }) => {
    const [mapaInfo, setMapaInfo] = useState(null);
    const [isErrorSession, setIsErrorSession] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataModal, setDataModal] = useState(null);

    const [dataLocal, setDataLocal] = useState(null);
    const [dataIdLocal, setDataIdLocal] = useState(null);

    const handleClick = async () => {
        const arrayInputs = ['inLocal', 'inNombre']
        const data = getMapInputs({ mapaInfo, idInputs: arrayInputs })
        console.log(data, 'Aqui data <==')
        // const validate = validateEditLocal({ data })
        // if (validate?.error) {
        //     setDataModal(result.error);
        //     setIsModalVisible(true);
        //     return;
        // }
        const dataFetch = editLocalDataFetch({ data })
        const obj = editLocalObj({ dataFetch })

        const result = await fetchDataPost({ ...obj, setLoading })
        if (result?.errorSession) setIsErrorSession(true);
        console.log(result)

        if (result.error) {
            setDataModal(result.error);
            setIsModalVisible(true);
        }
        if (typeof result === "string") {
            setDataModal(result);
            setIsModalVisible(true);
        } else if (!result) {
            setDataModal("No se pudo actualizar el local", result.error ?? '');
            setIsModalVisible(true);
        } else {
            setDataModal("Se actualizo correctamente el local");
            setIsModalVisible(true);
        }
    }

    //Buscar todos los locales
    useEffect(() => {
        const objLocal = objsFetch.objGetAllLocal;
        const getAllLocal = async () => {
            const data = await fetchDataPost({ ...objLocal, setLoading })
            if (data?.errorSession) setIsErrorSession(true)

            const dataMap = data.map(item => {
                return (
                    <option value={item.id_local} key={item.id_local}>
                        {item.de_local}
                    </option>
                )
            })
            setDataLocal(dataMap)
        }
        getAllLocal();
    }, [])

    //Cargar todos los locales
    useEffect(() => {
        if (!mapaInfo || !dataLocal) return;

        mapaInfo.get('inLocal').setInfo({
            value: '',
            options: dataLocal
        })

    }, [mapaInfo, dataLocal])
    //Cargar nombre de local
    useEffect(() => {
        if (!mapaInfo || !dataIdLocal) return;

        mapaInfo.get('inNombre').setInfo({
            value: dataIdLocal,
            options: ''
        })

    }, [mapaInfo, dataIdLocal])

    const handleChangeLocal = (e) => {
        const deLocal = e.target.value;
        if (deLocal == '') return;

        setDataIdLocal(deLocal)
    }

    const eventHandlers = {
        inLocal: handleChangeLocal
    }
    if (isErrorSession) return <ModalSession />;
    if (dataModal && isModalVisible)
        return (
            <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />
        );

    return (
        <section className="container-magic-forms">
            <div className="container-form-magic">
                <h1>Editar Local</h1>
                <MagicForms
                    infoData={infoInputsBo.editLocal}
                    mapaInfo={setMapaInfo}
                    eventHandlers={eventHandlers}
                />
                <ButtonVe content="Enviar" click={handleClick} />
            </div>
        </section>
    );
}

export default EditLocal;