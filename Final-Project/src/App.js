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
import AppFooter from "./components/footer/Footer";
import NotFound from "./components/NotFound";
import Logout from "./components/auth/Logout";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <MessageProvider>
        <UserProvider>
          <AppHeader />
          <Layout>
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
                  <Logout />
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
                <Route exact path="/movies/:id/edit">
                  <DataContainer isEditMode={true} />
                </Route>
                <Route exact path="/movies/:id">
                  <MovieItem />
                </Route>
                <Route exact path="/games/:id/edit">
                  <DataContainer isEditMode={true} />
                </Route>
                <Route exact path="/games/:id">
                  <GameItem />
                </Route>
                <Route path="*">
                  <NotFound />
                </Route>
              </Switch>
            </Content>
          </Layout>
          <AppFooter />
        </UserProvider>
      </MessageProvider>
    </Router>
  );
}

export default App;
