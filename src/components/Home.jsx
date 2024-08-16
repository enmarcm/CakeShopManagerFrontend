import { Button } from "antd";
import torta from "../imgs/torta.svg";
import TypeIt from "typeit";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  useEffect(() => {
    const iTypeIt = new TypeIt(".main-letter-home", {
      strings: "",
      speed: 100,
      loop: true,
    }).go();

    iTypeIt.type("profesional.").pause(100);
  }, []);

  return (
    <main className="main-container-home">
      <div className="container-home">
        <div className="container-home-grid">
          <div className="main-elements-home">
            <h1 className="main-letter">
              Controla tus ventas como un <br />
              <span className="main-letter-home"></span>
            </h1>

            <p className="p-home">
            ¡Endulza cada momento de tu vida con nuestras deliciosas creaciones!
            </p>

            <div className="containerButton">
              <Button className="btn-home btn-home-1">
                <Link to={"/login"}>Ingresar</Link>
              </Button>

              <Button className="btn-home btn-home-2">
                <Link to={"/contacto"}>Contacto</Link>
              </Button>
            </div>
          </div>

          <div className="logo-torta-home">
            <img src={torta} alt="Torta" className="torta-main" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
