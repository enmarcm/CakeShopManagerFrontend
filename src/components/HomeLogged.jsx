import NavUpInfo from "./NavUpInfo";
import "../styles/HomeLogged.css";
import Clock from "./Clock";
import ButtonVe from "./ButtonVe";
import GraficoHome from "./GraficoHome";

const HomeLogged = ({
  setLoading,
  infoUser: {
    name = "Enmanuel Colina",
    avatar = "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
  } = {},
}) => {
  return (
    <section className="container-home-logged">
      <NavUpInfo name={name} avatar={avatar} />

      <div className="content-home">
        <div className="content-reloj">
          <div className="content-buttons-card">
            <h3 className="hora-actual">Hora actual</h3>
            <Clock />
          </div>
        </div>

        <div className="content-buttons">
          <div className="content-buttons-card">
            <div className="container-item-button">
              <ButtonVe content={"REPORTES"} isLink routeIsLink={'/reportsHandler'}/>
            </div>
          </div>
        </div>

        <div className="grafico">
          <div className="grafico-card">
            <h2>Ventas por día</h2>
            <GraficoHome />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLogged;
