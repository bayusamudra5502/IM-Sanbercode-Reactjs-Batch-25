import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DataMahasiswaContext } from "./MahasiswaContext";
import { deleteData, getData } from "./API";
import { useHistory } from "react-router";

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

export default function RowMahasiswa({ dataMahasiswa }) {
  const [, setDBMahasiswa] = useContext(DataMahasiswaContext);
  const history = useHistory();

  const editHandler = () => {
    history.push(`/tugas15/edit/${dataMahasiswa.id}`);
  };

  const deleteHandler = async () => {
    if (await deleteData(dataMahasiswa.id)) {
      const newData = await getData();
      setDBMahasiswa(newData);
    }
  };

  return (
    <tr>
      <td>{dataMahasiswa.index + 1}</td>
      <td>{dataMahasiswa.name}</td>
      <td>{dataMahasiswa.course}</td>
      <td>{dataMahasiswa.score}</td>
      <td>{nilaiConverter(dataMahasiswa.score)}</td>
      <td>
        <button onClick={editHandler}>Edit</button>
        <button onClick={deleteHandler}>Hapus</button>
      </td>
    </tr>
  );
}

RowMahasiswa.propTypes = {
  dataMahasiswa: PropTypes.exact({
    index: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    course: PropTypes.string,
    score: PropTypes.number,
  }),
};
