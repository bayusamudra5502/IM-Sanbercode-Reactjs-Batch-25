import React from "react";
import { UserProvider } from "./components/context/UserContext";
import { MessageProvider } from "./components/context/MessageContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import AppHeader from "./components/header/AppHeader";
import Home from "./components/home/Home";
import Movie from "./components/movies/";
import MovieItem from "./components/movieItem/MovieItem";
import Games from "./components/game/Games";
import GameItem from "./components/gameItem/GameItem";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import GantiPassword from "./components/auth/GantiPassword";
import DataContainer from "./components/data/DataContainer";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <MessageProvider>
        <UserProvider>
          <Layout>
            <AppHeader />
            <Content>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/movies">
                  <Movie />
                </Route>
                <Route exact path="/games">
                  <Games />
                </Route>
                <Route exact path="/change-password">
                  <GantiPassword />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/logout">
                  <p>Logout</p>
                </Route>
                <Route exact path="/games/data">
                  <DataContainer />
                </Route>
                <Route exact path="/movies/data">
                  <DataContainer />
                </Route>
                <Route exact path="/games/add">
                  <DataContainer />
                </Route>
                <Route exact path="/movies/add">
                  <DataContainer />
                </Route>
                <Route path="/movies/:id/edit">
                  <DataContainer isEditMode={true} />
                </Route>
                <Route path="/movies/:id">
                  <MovieItem />
                </Route>
                <Route path="/games/:id/edit">
                  <DataContainer isEditMode={true} />
                </Route>
                <Route path="/games/:id">
                  <GameItem />
                </Route>
              </Switch>
            </Content>
          </Layout>
        </UserProvider>
      </MessageProvider>
    </Router>
  );
}

export default App;
