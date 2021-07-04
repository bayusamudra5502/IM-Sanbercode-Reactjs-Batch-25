import React, { useContext, useEffect } from "react";
import { Layout, Menu, message } from "antd";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import UserContext from "../context/UserContext";

import { destroySession } from "../../lib/UserAPI";

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

  const logout = (e) => {
    e.preventDefault();
    destroySession();
    setUser(null);
    message.info("Berhasil Logout.");
  };

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
            <SubMenu key="data" title="Lihat Data">
              <Menu.Item key="data-movies">
                <Link to="/movies/data">Data Film</Link>
              </Menu.Item>
              <Menu.Item key="add-movies">
                <Link to="/movies/add">Tambah Film</Link>
              </Menu.Item>
              <Menu.Item key="ass-games">
                <Link to="/games/add">Tambah Games</Link>
              </Menu.Item>
              <Menu.Item key="data-games">
                <Link to="/games/data">Data Games</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="logout">
              <a href="/logout" onClick={logout}>
                Logout
              </a>
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
