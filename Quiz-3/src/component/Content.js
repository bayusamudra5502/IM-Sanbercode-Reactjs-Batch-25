import React from "react";
import Home from "./home";
import About from "./about/";
import Login from "./auth/Login";
import AppList from "./app-list";
import { Switch, Route } from "react-router-dom";

export default function Content() {
  return (
    <section>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/mobile-apps">
          <AppList />
        </Route>
      </Switch>
    </section>
  );
}
