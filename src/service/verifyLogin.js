import Cookies from "js-cookie";


export const verifyLoginCookie = ({ setLogger, navigate, location }) => {
    const logged = Cookies.get("connect.sid") ? true : false;
    setLogger(logged);
  
    if (logged) {
      if (location.pathname === "/") {
        return navigate("/home");
      }
    } else {
      if (location.pathname !== "/" && location.pathname !== "/login" ) {
        return navigate("/");
      }
    }

};

export const verifyMethodsNav = ({ setLogger, navigate, setDataNav, setDataUser }) => {
  const info = localStorage.getItem("permisosNav");
  const infoUser = localStorage.getItem("dataUser");

  if (!info || !infoUser) {
    setLogger(false);
    return navigate("/");
  }

  const permisosNav = JSON.parse(info);
  const dataUser = JSON.parse(infoUser);

  setDataNav(permisosNav);
  setDataUser(dataUser);
  return;
};

export const verifyLogout = ({ setLogger, setData, result }) => {
  Cookies.remove("connect.sid");
  localStorage.removeItem("permisosNav");
  localStorage.removeItem("dataUser");
  setLogger(false);
  setData(result.message || "La sesion se cerro correctamente");
};

export const verifySession = async ({ setLogger, navigate }) => {
  const prueba = await fetchDataPost({
    area: "prueba",
    object: "prueba",
    method: "prueba",
    params: {},
  });

  if (prueba.errorSession) {
    Cookies.remove("connect.sid");
    localStorage.removeItem("permisosNav");
    localStorage.removeItem("dataUser");

    setLogger(false);

    console.log("se cierra session tonto");
    return navigate("/");
  }
};