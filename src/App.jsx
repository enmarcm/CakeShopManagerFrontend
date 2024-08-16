import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Layout } from "antd";
import SideBar from "./components/Sidebar/SideBar";
import Content from "./components/Content";
import "./styles/App.css";
import { verifyLoginCookie, verifyMethodsNav } from "./service/verifyLogin";
import SuperLoader from "./components/SuperLoader";
import FinalChatProbe from "./components/Messages/FinalChatProbe";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkTheme, setDrakTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [dataNav, setDataNav] = useState({});
  const [dataUser, setDataUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    verifyMethodsNav({
      setLogger: setIsLogged,
      navigate,
      setDataNav,
      setDataUser,
    });
  }, [isLogged]);

  const changeTheme = () => setDrakTheme(!darkTheme);
  const changeCollapsed = () => setCollapsed(!collapsed);

  return (
    <main>
      <Layout className="main" onClick={!collapsed ? changeCollapsed : null}>
        {isLogged && (
          <SideBar
            darkTheme={darkTheme}
            changeTheme={changeTheme}
            collapsed={collapsed}
            changeCollapsed={changeCollapsed}
            infoMethod={dataNav}
            navigate={navigate}
            infoUser={dataUser}
          />
        )}

        <Content
          dataUser={dataUser}
          darkMode={darkTheme}
          setLogger={setIsLogged}
          setDataNav={setDataNav}
          navigate={navigate}
          isLogged={isLogged}
          setDataUser={setDataUser}
          location={location}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {isLogged && dataUser && (
          <div className="contenedor-chats-increible">
            <FinalChatProbe
              typeChat={"broadcast"}
              userData={{ user: dataUser.name, profile: dataUser.profile }}
            />
            <FinalChatProbe
              typeChat={"zones"}
              userData={{ user: dataUser.name, profile: dataUser.profile }}
            />
          </div>
        )}
      </Layout>
    </main>
  );
}

export default App;
