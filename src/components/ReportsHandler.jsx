import "../styles/ReportsHandler.css";
import ButtonVe from "./ButtonVe";

const ReportsHandler = ({ profile }) => {
  return (
    <section className="container-reports-handler">
      <div className="container-cards">
        <h2>Reportes</h2>
        <div className="container-buttons">
          {profile == "admin" ? (
            <>
              <ButtonVe
                content={"Rutas"}
                isLink
                routeIsLink={"/reports?filter=routes&main=true"}
              />
              <ButtonVe
                content={"Productos"}
                isLink={true}
                routeIsLink={"/reports?filter=products&main=true"}
              />
              <ButtonVe
                content={"Locales"}
                isLink
                routeIsLink={"/reports?filter=local&main=true"}
              />
              <ButtonVe
                content={"Facturas"}
                isLink
                routeIsLink={"/reports?filter=billing&main=true"}
              />
              <ButtonVe
                content={"Vendedores"}
                isLink
                routeIsLink={"/reports?filter=seller&main=true"}
              />
              <ButtonVe
                content={"Personas"}
                isLink
                routeIsLink={"/reports?filter=person&main=true"}
              />
            </>
          ) : (
            <>
              <ButtonVe
                content={"Vendedores"}
                isLink
                routeIsLink={"/reports?filter=seller&main=true"}
              />
              <ButtonVe
                isLink
                content={"Facturas"}
                routeIsLink={"/reports?filter=billing&main=true"}
              />
              <ButtonVe
                content={"Productos"}
                isLink
                routeIsLink={"/reports?filter=products&main=true"}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReportsHandler;
