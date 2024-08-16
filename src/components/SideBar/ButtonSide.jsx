import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import { Button } from "antd";


const ButtonSide = ({ collapsed, changeCollapsed , darkTheme}) => {

    return (
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} className={darkTheme ? ' toggle btn-toggle btn-dark' : 'toggle btn-toggle btn-light'}  onClick={changeCollapsed}/>

    )
}

export default ButtonSide