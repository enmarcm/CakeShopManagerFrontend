import "../styles/Correo.css";
import "../styles/Login.css";
import ButtonVe from "./ButtonVe";
import correo from "../imgs/correo.svg";

const EnvioCorreo = () => {
  return (
    <section className="container-login">
      <div className="card-login correo-card">
        <div className="grid-login login-container correo-container">
          {/* <div className="ingresa-img"> */}

          <div className="container-h1">
            <h1>Tu nueva contraseña se ha enviado a tu correo electrónico</h1>
          </div>

          <p>Ingresa con tu nueva contraseña</p>

          <ButtonVe content={"Ir a inicio"} isLink routeIsLink={"/"} />
        </div>

        {/* </div> */}

        <div className="grid-dino dino-login">
          <div className="container-dino-login">
            <img src={correo} alt="Dino" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnvioCorreo;
