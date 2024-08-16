import { URL_BASE } from "../constants/url";

const fetcho = async ({ url, method, body }) => {
  try {
    const configPost = {
      method: "POST",
      credentials: "include",
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(body),
    };

    const configGet = {
      method: "GET",
      credentials: "include",
      cors: "cors",
    };

    const config = method.toLowerCase() === "post" ? configPost : configGet;

    const response = await fetch(`${URL_BASE}${url}`, config);
    const data = await response.json();
    console.log(data)

    if (data?.errorSession) {
      console.log('No hay sesion activa')
      // return false
    }

    return data;
  } catch (error) {
    console.error(`Ocurrio un error realizando un fetch, donde la url era ${url} y el error fue ${error.message}`)
    return false
  }
};

export default fetcho