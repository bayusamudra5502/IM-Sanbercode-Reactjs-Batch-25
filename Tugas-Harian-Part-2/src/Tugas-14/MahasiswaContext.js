import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DataMahasiswaContext = createContext();
export const ActionContext = createContext();

function MahasiswaProvider({ children }) {
  const mahasiswa = useState([]);
  const action = useState({ mode: "UPDATE", id: -1, data: {} });

  return (
    <ActionContext.Provider value={action}>
      <DataMahasiswaContext.Provider value={mahasiswa}>
        {children}
      </DataMahasiswaContext.Provider>
    </ActionContext.Provider>
  );
}

MahasiswaProvider.propTypes = {
  children: PropTypes.node,
};

export default MahasiswaProvider;
