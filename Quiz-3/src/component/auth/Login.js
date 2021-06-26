import React, { useContext, useState } from "react";
import { LoginContext } from "../Context/LoginContext";
import { isValidLogin, setLogin as setLoginBrowser } from "./loginLib";
import { useHistory } from "react-router";

import "../../assets/css/login.css";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { setLogin } = useContext(LoginContext);
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    if (isValidLogin(formData.username, formData.password)) {
      setLoginBrowser(formData.username);
      setLogin({ isLogged: true, username: formData.username });
      history.push("/");
    } else {
      alert("Pasangan Username dan Password tidak ditemukan.");
    }
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <>
      <h1>Login</h1>
      <form className="login" onSubmit={submitHandler}>
        <p>Please insert your credential:</p>
        <div className="form-component">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={changeHandler}
            required
          ></input>
        </div>
        <div className="form-component">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={changeHandler}
            value={formData.password}
            required
          ></input>
        </div>
        <div className="form-action">
          <button>Login</button>
        </div>
      </form>
    </>
  );
}
