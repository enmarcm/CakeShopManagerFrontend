import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useFetcher } from "react-router-dom";
import { verifyLoginCookie, verifyMethodsNav } from "../service/verifyLogin";
import SuperLoader from "./SuperLoader";
const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const Logout = lazy(() => import("./Logout"));
const CreatePerson = lazy(() => import("../BO/CreatePerson"));
const CreateProduct = lazy(() => import("../BO/CreateProduct"));
const MyRoute = lazy(() => import("./MyRoute"));
const CreateRoute = lazy(() => import("../BO/CreateRoute"));
const CreateLocal = lazy(() => import("../BO/CreateLocal"));
const CreatePayMethod = lazy(() => import("../BO/CreatePayMethod"));
const ChangeStatusSeller = lazy(() => import("../BO/ChangeStatusSeller"));
const AsignarLocalVendedor = lazy(() => import("../BO/AsignarLocalVendedor"));
const CreateBilling = lazy(() => import("../BO/CreateBilling"));
const AsingPayToBill = lazy(() => import("../BO/payBill"));
const EditPerson = lazy(() => import("../BO/EditPerson"));
const AsignarSalarioVendedor = lazy(() =>
  import("../BO/AsignarSalarioVendedor")
);
const HomeLogged = lazy(() => import("./HomeLogged"));
const FinalChatProbe = lazy(() => import("./Messages/FinalChatProbe"));
const Contacto = lazy(() => import("./Contacto"));
const EditProduct = lazy(() => import('../BO/EditProduct'))
const EditLocal = lazy(() => import('../BO/EditLocal'))
const ReportsHandler = lazy(() => import('./ReportsHandler'))
const OlvidoDatos = lazy(() => import('./OlvidoDatos'))
const Preguntas = lazy(() => import('./Preguntas'))
const EnvioCorreo = lazy(() => import('./EnvioCorreo.jsx'))

const Content = ({
  dataUser,
  darkMode,
  setLogger,
  setDataNav,
  navigate,
  isLogged,
  setDataUser,
  location,
  isLoading,
  setIsLoading,
}) => {

  useEffect(() => {
    verifyLoginCookie({ navigate, setLogger, location });
    verifyMethodsNav({ setLogger, navigate, setDataNav, setDataUser });
  }, []);

  return (
    //TODO: MODIFICAR AQUI ESTO QUE LOS ELEMENTOS USAN
    //TODO: ADEMAS RECORDAR QUE TODOS LOS COMPONENTES QUE CARGUEN DEBERAN USAR SU WITDH 100%
    <Suspense fallback={<SuperLoader />}>
      {isLoading && <SuperLoader />}

      <Routes className={"main-layout"}>
        <Route
          path="/"
          element={
            <Home
              className={darkMode ? "darkMode" : "lightMode"}
              style={{ width: "100%" }}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              className={darkMode ? "darkMode" : "lightMode"}
              style={{ width: "100%" }}
              setLogger={setLogger}
              setDataNav={setDataNav}
              navigate={navigate}
              isLogged={isLogged}
              setDataUser={setDataUser}
              setLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/logout"
          element={
            <Logout
              className={darkMode ? "darkMode" : "lightMode"}
              setLogger={setLogger}
              isLogged={isLogged}
              style={{ width: "100%" }}
              navigate={navigate}
            />
          }
        />

        <Route
          path="/home"
          element={<HomeLogged setLoading={setIsLoading} infoUser={dataUser} />}
        />

        {/* Estas se pueden hacer dinamicas */}
        <Route
          path="/person/control/createPerson"
          element={<CreatePerson setLoading={setIsLoading} />}
        />

        <Route
          path="/sales/products/createProduct"
          element={<CreateProduct setLoading={setIsLoading} />}
        />

        <Route
          path="/local/control/createRoute"
          element={<CreateRoute setLoading={setIsLoading} />}
        />

        <Route
          path="/local/control/createLocal"
          element={<CreateLocal setLoading={setIsLoading} />}
        />

        <Route
          path="/billing/payMethod/createMethod"
          element={<CreatePayMethod setLoading={setIsLoading} />}
        />

        <Route
          path="/seller/control/changeStatusSeller"
          element={<ChangeStatusSeller setLoading={setIsLoading} />}
        />

        <Route
          path="/seller/control/asignLocalSeller"
          element={<AsignarLocalVendedor setLoading={setIsLoading} />}
        />

        <Route
          path="/reports"
          element={<MyRoute setLoading={setIsLoading} className={darkMode ? "darkMode" : "lightMode"} />}
        />

        <Route
          path="/billing/bill/createBill"
          element={<CreateBilling setLoading={setIsLoading} />}
        />

        <Route
          path="/billing/bill/payBill"
          element={<AsingPayToBill setLoading={setIsLoading} />}
        />

        <Route
          path="/person/control/editPerson"
          element={<EditPerson setLoading={setIsLoading} />}
        />
        <Route
          path="/sales/products/updateToProductSale"
          element={<EditProduct setLoading={setIsLoading} />}
        />
        <Route
          path="/local/control/editTo"
          element={<EditLocal setLoading={setIsLoading} />}
        />
        <Route
          path="/seller/order/asignTypePay"
          element={<AsignarSalarioVendedor setLoading={setIsLoading} />}
        />

        {dataUser && <Route 
          path="/reportsHandler"
          element={<ReportsHandler profile={ dataUser.profile}/>}
        />}

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/olvidoDatos" element={<OlvidoDatos setLoading={setIsLoading}/>} />

        <Route path="/olvidoDatos/preguntas" element={<Preguntas setLoading={setIsLoading}/>} />

        <Route path="/olvidoDatos/envioCorreo" element={<EnvioCorreo />} />
      </Routes>
    </Suspense>
  );
};

export default Content;