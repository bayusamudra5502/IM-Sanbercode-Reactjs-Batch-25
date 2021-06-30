import React, { useContext, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import UserContext from "../context/UserContext";

import icon from "../../assets/img/icon.png";
import { getSession } from "../../lib/UserAPI";

const { SubMenu } = Menu;
const { Header } = Layout;

export default function AppHeader() {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const regex = /\/([\w-]+)\/?/g;

  const selectedRes = regex.exec(location.pathname);
  const selected = selectedRes ? selectedRes[1] : "home";

  useEffect(() => {
    const session = getSession();

    if (session) {
      setUser(session);
    }
  }, []);

  return (
    <Header className="header">
      <Link className="logo" to="/">
        <img src={icon} alt="logo"></img>
        Movigempedia
      </Link>
      <Menu theme="dark" mode="horizontal" selectedKeys={selected}>
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="movies">
          <Link to="/movies">Movies</Link>
        </Menu.Item>
        <Menu.Item key="games">
          <Link to="/games">Games</Link>
        </Menu.Item>
        {user ? (
          <SubMenu key="user" title={user.name}>
            <Menu.Item key="change-password">
              <Link to="/change-password">Ubah Kata Sandi</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              <Link to="/logout">Logout</Link>
            </Menu.Item>
          </SubMenu>
        ) : (
          <Menu.Item key="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
      </Menu>
    </Header>
  );
}