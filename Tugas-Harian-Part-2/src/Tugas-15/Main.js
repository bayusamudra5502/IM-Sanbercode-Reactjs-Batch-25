import React from "react";
import Mahasiswa from "./Mahasiswa";
import Mahasiswa13 from "../Tugas-13/Mahasiswa";
import Mahasiswa14 from "../Tugas-14/Mahasiswa";
import Buah from "../Tugas-12";
import Tugas9 from "../Tugas-9/Tugas9";
import TabelBuah from "../Tugas-10/Tugas10";
import JamMundur from "../Tugas-11/Jam";
import Navbar from "./Navbar";
import ThemeProvider from "./ThemeContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Main() {
  return (
    <Router>
      <ThemeProvider>
        <Navbar />
        <Content />
      </ThemeProvider>
    </Router>
  );
}

function Content() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="wrapper">
          <Tugas9></Tugas9>
        </div>
      </Route>
      <Route exact path="/Tugas10">
        <div className="wrapper">
          <TabelBuah></TabelBuah>
        </div>
      </Route>
      <Route exact path="/Tugas11">
        <div className="wrapper">
          <JamMundur />
        </div>
      </Route>
      <Route exact path="/Tugas12">
        <div className="wrapper">
          <Buah />
        </div>
      </Route>
      <Route exact path="/Tugas13">
        <div className="wrapper">
          <Mahasiswa13 />
        </div>
      </Route>
      <Route exact path="/Tugas14">
        <div className="wrapper">
          <Mahasiswa14 />
        </div>
      </Route>
      <Route path="/Tugas15">
        <Mahasiswa />
      </Route>
    </Switch>
  );
}
