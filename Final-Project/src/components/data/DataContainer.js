import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSession } from "../../lib/UserAPI";
import { Layout, Menu } from "antd";
import { useLocation, useParams, useHistory } from "react-router";
import { Link, Switch, Route } from "react-router-dom";
import Jumbotron from "../Jumbotron";
import dataImg from "../../assets/img/data-background.jpg";
import MovieTable from "./MovieTable";
import GameTable from "./GameTable";
import UserContext from "../context/UserContext";
import MessageContext from "../context/MessageContext";

const { Sider } = Layout;
const { SubMenu } = Menu;

function DataContainer({ isEditMode }) {
  const location = useLocation();
  const history = useHistory();

  const { id } = useParams();
  const [hidden, setHidden] = useState({
    film: true,
    game: true,
  });
  const [selectedKey, setSelectedKey] = useState([]);

  const { setMessage } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const [opened, selected] = location.pathname.split("/").slice(1);

  if (user || getSession()) {
    const changeHidden = () => {
      if (isEditMode) {
        setHidden({
          film: opened !== "movies",
          game: opened !== "games",
        });
      } else {
        setHidden({
          film: true,
          game: true,
        });
      }
    };

    const changeSelectedKey = () => {
      let key = isEditMode ? `edit-${opened}` : `${selected}-${opened}`;

      setSelectedKey(key);
    };

    useEffect(() => {
      changeSelectedKey();
      changeHidden();
    }, []);

    useEffect(changeHidden, [isEditMode]);
    useEffect(changeSelectedKey, [location]);

    return (
      <>
        <Jumbotron
          src={dataImg}
          alt="Kumpulan data"
          imgStyle={{ top: "10%" }}
        />
        <div className="data-container">
          <Sider className="sidebar" width={200}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              defaultOpenKeys={[opened]}
              style={{ height: "100%" }}
              theme="dark"
            >
              <SubMenu key="movies" title="Film">
                <Menu.Item key="add-movies">
                  <Link to="/movies/add">Tambah Film</Link>
                </Menu.Item>
                <Menu.Item key="data-movies">
                  <Link to="/movies/data">Tabel Film</Link>
                </Menu.Item>
                <Menu.Item key="edit-movies" hidden={hidden.film}>
                  Edit Film
                </Menu.Item>
              </SubMenu>
              <SubMenu key="games" title="Game">
                <Menu.Item key="add-games">
                  <Link to="/games/add">Tambah Game</Link>
                </Menu.Item>
                <Menu.Item key="data-games">
                  <Link to="/games/data">Tabel Game</Link>
                </Menu.Item>
                <Menu.Item key="edit-games" hidden={hidden.game}>
                  Edit Game
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <div className="container-subfeature">
            <Switch>
              <Route path="/movies/data" component={MovieTable} />
              <Route path="/games/data" component={GameTable} />
            </Switch>
          </div>
        </div>
      </>
    );
  } else {
    setMessage({
      type: "warning",
      message: "Peringatan",
      description: `Anda harus login terlebih dahulu untuk mengakses fitur ini`,
    });

    if (id === undefined) {
      history.push("/");
    } else {
      history.push(`/${opened}/${id}`);
    }

    return null;
  }
}

DataContainer.defaultProps = {
  isEditMode: false,
};

DataContainer.propTypes = {
  isEditMode: PropTypes.bool,
};

export default DataContainer;
