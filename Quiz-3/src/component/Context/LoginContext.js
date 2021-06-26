import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [login, setLogin] = useState({ isLogged: false, username: "" });

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node,
};
