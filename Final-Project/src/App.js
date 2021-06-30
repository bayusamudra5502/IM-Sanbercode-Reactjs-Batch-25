import React from "react";
import { UserProvider } from "./components/context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import AppHeader from "./components/header/AppHeader";
import Home from "./components/home/Home";
import Movie from "./components/movies/";
import MovieItem from "./components/movieItem/MovieItem";

const { Content } = Layout;

function App() {
  return (
    <Router>
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
                <p>Games</p>
              </Route>
              <Route exact path="/change-password">
                <p>Change Password</p>
              </Route>
              <Route exact path="/logout">
                <p>Logout</p>
              </Route>
              <Route exact path="/list-table">
                <p>List Table</p>
              </Route>
              <Route path="/movies/:id/edit">
                <p>Edit Movie ber-id</p>
              </Route>
              <Route path="/movies/:id">
                <MovieItem />
              </Route>
              <Route path="/games/:id/edit">
                <p>Edit Game ber-id</p>
              </Route>
              <Route path="/games/:id">
                <p>Game ber-id</p>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </UserProvider>
    </Router>
  );
}

export default App;
