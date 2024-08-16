import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const useURLParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [params, setParams] = useState({});

    useEffect(() => {
        try {
            const obj = {};
            const myArray = [];
            const myArray2 = [];
            for (const [key, value] of searchParams.entries()) {
                if (key.startsWith('params')) {
                    myArray.push(value)
                }
                if (key.startsWith('typeParams')) {
                    myArray2.push(value)
                }
                obj[key] = value;
            }
            obj['params'] = myArray
            obj['typeParams'] = myArray2;
            setParams(obj)
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }, [location.search, location.pathname]); // Escucha los cambios en la ruta y la cadena de consulta

    return { params };
};

export default useURLParams;
