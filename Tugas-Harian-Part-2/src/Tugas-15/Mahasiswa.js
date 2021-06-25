import React, { useContext } from "react";
import TableMahasiswa from "./TableMahasiswa";
import FormMahasiswa from "./FormMahasiswa";
import MahasiswaProvider from "./MahasiswaContext";
import { ThemeContext } from "./ThemeContext";
import { Route, Switch } from "react-router-dom";
import "./Mahasiswa.css";

const Mahasiswa = () => {
  const path = "/Tugas15";
  const [, toggleTheme] = useContext(ThemeContext);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <MahasiswaProvider>
        <Switch>
          <Route exact path={path}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <TableMahasiswa />
          </Route>
          <Route path={`${path}/edit/:id`}>
            <FormMahasiswa editMode={true}></FormMahasiswa>
          </Route>
          <Route path={`${path}/create`}>
            <FormMahasiswa />
          </Route>
        </Switch>
      </MahasiswaProvider>
    </div>
  );
};

export default Mahasiswa;
