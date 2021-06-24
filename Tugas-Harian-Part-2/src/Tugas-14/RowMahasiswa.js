import React, { useContext } from "react";
import { ActionContext } from "./MahasiswaContext";
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

export default function RowMahasiswa({ dataMahasiswa }) {
  const [, setAction] = useContext(ActionContext);

  const editHandler = () => {
    setAction({
      mode: "EDIT",
      id: dataMahasiswa.id,
    });
  };

  const deleteHandler = () => {
    setAction({
      mode: "DELETE",
      id: dataMahasiswa.id,
    });
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
