import { Button } from "antd";
import { Link } from "react-router-dom";
import "../styles/ButtonVe.css";

const ButtonVe = ({ content, click, ide, isLink, routeIsLink, className }) => {
  const handleClick = () => click ? click() : null;

  return (
    <Button
      onClick={handleClick}
      id={ide}
      className={`${isLink ? "btn-link" : "btn-no-link"} ${className}`}
    >
      {isLink && routeIsLink ? (
        <Link to={routeIsLink}>{content}</Link>
      ) : (
        content
      )}
    </Button>
  );
};

export default ButtonVe;