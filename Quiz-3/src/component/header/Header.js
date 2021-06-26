import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { getLogin } from "../auth/loginLib";
import { useHistory } from "react-router";
import { resetLogin } from "../auth/loginLib";

import logo from "../../assets/img/logo.png";

export default function Header() {
  const { login, setLogin } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    const username = getLogin();
    if (username) {
      setLogin({ isLogged: true, username });
    }
  }, []);

  const loginDestroyer = () => {
    resetLogin();
    setLogin({ isLogged: false, username: "" });

    history.push("/");
  };

  return (
    <header>
      <ul>
        <li>
          <img src={logo} alt="Logo" />
        </li>
        {login.isLogged ? (
          <li>
            <div className="dropdown">
              <button className="dropbtn">{login.username}</button>
              <div className="dropdown-content">
                <Link to="/mobile-apps">Mobile App List Editor</Link>
                <button onClick={loginDestroyer} className="logout">
                  Logout
                </button>
              </div>
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}

        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </header>
  );
}
