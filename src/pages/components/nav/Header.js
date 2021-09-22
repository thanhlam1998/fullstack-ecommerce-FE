import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import firebase from "firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { actionTypes } from "../../../actions/types";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user } = useSelector((state) => ({ ...state }));

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
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      style={{ display: "block" }}
      mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      {user && (
        <SubMenu
          className="float-end"
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}>
          {user && user.role === "subscriber" && (
            <Item key="dashboard">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item key="dashboard">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      {!user && (
        <Item className="float-end" key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item className="float-end" key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      <div className="float-end">
        <Search />
      </div>
    </Menu>
  );
};

export default Header;
