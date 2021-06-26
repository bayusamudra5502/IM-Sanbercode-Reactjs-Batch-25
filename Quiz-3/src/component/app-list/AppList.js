import React, { useContext } from "react";
import { DataProvider } from "../Context/DataContext";
import { EditProvider } from "../Context/EditContext";
import { LoginContext } from "../Context/LoginContext";
import AppTable from "./AppTable";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import AppForm from "./AppForm";
import "../../assets/css/AppList.css";

export default function AppList() {
  const { login } = useContext(LoginContext);

  if (login.isLogged) {
    return (
      <DataProvider>
        <EditProvider>
          <div className="container">
            <SearchBar />
            <AppTable />
            <AppForm />
          </div>
        </EditProvider>
      </DataProvider>
    );
  } else {
    return (
      <>
        <h2>Oops</h2>
        <p>You have to log in to access this page.</p>
        <br></br>
        <Link to="/">Back to main menu</Link>
      </>
    );
  }
}
