import React from "react";
import PropTypes from "prop-types";

const nilaiConverter = (nilai) => {
  switch (true) {
    case nilai >= 80:
      return "A";
    case nilai >= 70:
      return "B";
    case nilai >= 60:
      return "C";
    case nilai >= 50:
      return "D";
    default:
      return "E";
  }
};

const RowMahasiswa = (props) => {
  const editHandler = () => {
    props.onEdit(props.datumMahasiswa.id);
  };

  const deleteHandler = () => {
    props.onDelete(props.datumMahasiswa.id);
  };

  return (
    <tr>
      <td>{props.datumMahasiswa.currentIndex + 1}</td>
      <td>{props.datumMahasiswa.nama}</td>
      <td>{props.datumMahasiswa.mataKuliah}</td>
      <td>{props.datumMahasiswa.nilai}</td>
      <td>{nilaiConverter(props.datumMahasiswa.nilai)}</td>
      <td>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Hapus</button>
      </td>
    </tr>
  );
};

RowMahasiswa.propTypes = {
  datumMahasiswa: PropTypes.exact({
    currentIndex: PropTypes.number,
    id: PropTypes.number,
    nama: PropTypes.string,
    mataKuliah: PropTypes.string,
    nilai: PropTypes.number,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default RowMahasiswa;
