import Input from "./Input";
import { useEffect, useState } from "react";
import "../styles/Login.css";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import torta2 from "../imgs/torta2.svg";
import ButtonVe from "./ButtonVe";
import dinoLoginSvg from "../imgs/dinoLogin.svg";
import fetcho from "../service/fetcho";
import ModalBase from "./ModalBase";
import ModalSession from "./ModalSession";

const Login = ({
  setLogger,
  setDataNav,
  navigate,
  isLogged,
  setDataUser,
  setLoading,
}) => {

  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, []);

  const handleClickLogin = async () => {
    try {
      const user = document.getElementById("userInput").value;
      const password = document.getElementById("passInput").value;
      
      const body = {
        user,
        password,
      };
      
      const obj = { url: "/login", method: "POST", body };
      
      setLoading(true);
      const result = await fetcho(obj);
      setLoading(false);

      if(result?.errorSession) setIsErrorSession(true);

      if (result?.error) {
        setDataModal(result.error);
        setIsModalVisible(true);
        setLogger(false);
        // navigate("/login");
        return;
      }

      setLogger(true);

      if (!result?.userProfile) {
        navigate("/setProfile");
      }

      const permisosNav = result.permissions;
      // console.log(result);

      const datosUser = {
        id: result.profileData.idUser,
        name: result.profileData.user.toUpperCase(),
        email: result.profileData.email,
        profile: result.profileData.profile,
      };

      setDataUser(datosUser);
      localStorage.setItem("dataUser", JSON.stringify(datosUser));

      localStorage.setItem("permisosNav", JSON.stringify(permisosNav));
      setDataNav(permisosNav);

      return navigate("/home");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if(isErrorSession) return <ModalSession />
  if(isModalVisible && dataModal) return <ModalBase content={dataModal} setIsModalVisible={setIsModalVisible} />

  return (
    <section className="container-login">
      <div className="card-login">
        <div className="grid-login login-container">
          <div className="ingresa-img">
            <img src={torta2} alt="Torta" />
            <h1>Ingresa</h1>
          </div>

          <div className="inputs-login">
            <Input placeholder="Usuario" icon={faUser} iden="userInput" />

            <Input
              type="password"
              placeholder="Contraseña"
              icon={faLock}
              isPass
              iden="passInput"
            />
          </div>

          <div className="forget">
            <Link to="/olvidoDatos">Olvidaste tus datos?</Link>
          </div>

          <ButtonVe
            className="btn-c btn-ingresar"
            click={handleClickLogin}
            content={"Ingresar"}
          />
        </div>

        <div className="grid-login dino-login">
          <div className="container-dino-login">
            <h2>
              Las ventas esperan por tu <span>gestión.</span>
            </h2>
            <img src={dinoLoginSvg} alt="Dino" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
