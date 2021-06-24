import React from "react";
import TableMahasiswa from "./TableMahasiswa";
import FormMahasiswa from "./FormMahasiswa";
import MahasiswaProvider from "./MahasiswaContext";
import "./Mahasiswa.css";

const Mahasiswa = () => {
  return (
    <div className="container">
      <MahasiswaProvider>
        <TableMahasiswa />
        <FormMahasiswa />
      </MahasiswaProvider>
    </div>
  );
};

export default Mahasiswa;
