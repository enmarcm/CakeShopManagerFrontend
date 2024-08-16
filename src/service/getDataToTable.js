import { URL_BASE } from "../constants/url";
import fetcho from "./fetcho";

const getData = async ({ body }) => {
    try {
        const login = await fetcho({
            url: '/login', method: 'post', body: {
                user: 'uldren12',
                password: '1234'
            }
        })

        console.log(login);
        const url = `${URL_BASE}/toProcess`
        const objPost = {
            method: 'POST',
            cors: 'cors',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(body)
        }
        const response = await fetch(url, objPost)
        const json = await response.json()
        return json;

    } catch (error) {
        console.error(`Hubo un error al hacer el fetch con la url ${error}`)
        return false;
    }
}

export default getData;