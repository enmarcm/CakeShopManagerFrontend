import "../styles/Contacto.css";
import "../styles/Login.css";
import dino from "../imgs/dino2.svg";
import torta2 from "../imgs/torta2.svg";
import X from "../imgs/TwitterX.svg";
import gmail from "../imgs/Gmail.svg"
import ig from "../imgs/Instagram.svg"
import fp from "../imgs/Featurephone.svg"

const Contacto = () => {
  return (
    <section className="container-login">
      <div className="card-login">
        <div className="grid-login login-container">
          <div className="ingresa-img">
            <img src={torta2} alt="Torta" />
            <h1>Contacto</h1>
          </div>

          <div className="inputs-login">
            <div className="elements">
                <div className="element">
                    <img src={X} alt="X" />
                    <p>@tiendaTortas15</p>
                </div>
                <div className="element">
                    <img src={gmail} alt="Gmail" />
                    <p>correotortas@uru.edu</p>
                </div>
                <div className="element">
                    <img src={ig} alt="Instagram" />
                    <p>@torticas</p>
                </div>
                <div className="element">
                    <img src={fp} alt="Phone" />
                    <p>+584141231234</p>
                </div>
                          </div>
            </div>
        </div>

        <div className="grid-dino dino-login">
          <div className="container-dino-login">
            <h2>
              Por aquí podrás <span>contactarnos</span>
            </h2>

            <img src={dino} alt="Dino" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
