import { Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, LogoutOutlined, HomeFilled } from "@ant-design/icons";

const { Meta } = Card;

const InfoUser = ({
  name = "Enmanuel Colina",
  profile = "Admin",
  avatar = "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
  collapsed,
}) => {
  return (
    <Card
      style={{
        margin: 2,
        borderRadius: 0,
      }}
      actions={
        !collapsed
          ? [
              <Link to={"/home"}>
                <HomeFilled key="home" style={{ color: "green" }} />
              </Link>,
              // <Link to={"/editUser"}>
              //   <EditOutlined key="edit" style={{ color: "blue" }} />
              // </Link>,
              <Link to={"/logout"}>
                <LogoutOutlined key="logout" style={{ color: "red" }} />
              </Link>,
            ]
          : null
      }
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={!collapsed ? name : null}
        description={!collapsed ? profile : null}
      />
    </Card>
  );
};

export default InfoUser;
