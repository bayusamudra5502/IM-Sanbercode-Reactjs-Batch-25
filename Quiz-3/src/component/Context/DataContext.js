import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node,
};
