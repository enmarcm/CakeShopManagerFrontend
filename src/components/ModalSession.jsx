import ModalBase from "./ModalBase";
import ButtonVe from "./ButtonVe";
import Cookies from "js-cookie";

const ModalSession = () => {
  const content =
    "No hay sesion activa o ha  expirado, vuelva a ingresar sesion";


  const boton = (
    <ButtonVe isLink routeIsLink={'/logout'} content={'Salir'}/>
  );

  return (
    
      <ModalBase
        title="Sesion expirada"
        content={content}
        footer={boton}
        isClose={false}
      />
  );
};

export default ModalSession;
