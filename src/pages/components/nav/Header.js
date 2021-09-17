import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import firebase from "firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { actionTypes } from "../../../actions/types";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: actionTypes.LOGOUT,
      payload: null,
    });
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
      <Item key="login" icon={<UserOutlined />} className="ms-auto">
        <Link to="/login">Login</Link>
      </Item>
      <Item key="register" icon={<UserAddOutlined />}>
        <Link to="/register">Register</Link>
      </Item>
    </Menu>
  );
};

export default Header;
