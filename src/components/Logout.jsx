import { useEffect, useState } from "react";
import fetcho from "../service/fetcho";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/Logout.css";
import { verifyLogout } from "../service/verifyLogin";

const Logout = ({ setLogger, isLogged, navigate }) => {
  const [data, setData] = useState("Cerrar sesion");

  useEffect(() => {
    const handler = async () => {
      const result = await fetcho({ url: "/logout", method: "GET" });
      verifyLogout({setLogger,  setData, result });
      navigate("/login");

      if (result?.error) return setData(result.error);
    };

    handler();
  }, [data]);

  return <></>;
};

export default Logout;
