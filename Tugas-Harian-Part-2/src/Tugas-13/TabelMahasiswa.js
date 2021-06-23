import React from "react";
import PropTypes from "prop-types";
import RowMahasiswa from "./RowMahasiswa";

const TabelMahasiswa = (props) => {
  const editHandler = (id) => {
    props.onEdit(id);
  };

  const deleteHandler = (id) => {
    props.onDelete(id);
  };

  return (
    <div className="tabel">
      <h2>Daftar Nilai Mahasiswa</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Mata Kuliah</th>
            <th>Nilai</th>
            <th>Index Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((datum, index) => {
            return (
              <RowMahasiswa
                key={datum.id}
                datumMahasiswa={{ ...datum, currentIndex: index }}
                onDelete={deleteHandler}
                onEdit={editHandler}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

TabelMahasiswa.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nama: PropTypes.string,
      mataKuliah: PropTypes.string,
      nilai: PropTypes.number,
    })
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default TabelMahasiswa;
