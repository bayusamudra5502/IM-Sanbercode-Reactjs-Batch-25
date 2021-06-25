import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const DataMahasiswaContext = createContext();

function MahasiswaProvider({ children }) {
  const mahasiswa = useState([]);

  return (
    <DataMahasiswaContext.Provider value={mahasiswa}>
      {children}
    </DataMahasiswaContext.Provider>
  );
}

MahasiswaProvider.propTypes = {
  children: PropTypes.node,
};

export default MahasiswaProvider;
