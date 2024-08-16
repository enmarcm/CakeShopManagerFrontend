import "../styles/NavUpInfo.css";

const NavUpInfo = ({ name, avatar }) => {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("es-ES", options);

  return (
    <div className="nav-up-container-info">
      <div className="grid-item img-container">
        <div className="container-img-grid">
          <img src={avatar} alt={`Imagen de ${name}`} />
        </div>
      </div>
      <div className="grid-item nav-content">
        <h1>
          Bienvenido de nuevo <span className="nav-up-user">{name}</span>
        </h1>
        <p className="info-p">
          Esta es la informacion del día de hoy, {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default NavUpInfo;
