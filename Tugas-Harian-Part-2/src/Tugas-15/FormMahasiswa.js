import React, { useState, useEffect } from "react";
import { updateData, addData, getData } from "./API";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

const DEFAULT_DATA = {
  id: -1,
  name: "",
  course: "",
  score: 0,
};

function FormMahasiswa(props) {
  const [data, setData] = useState(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(async () => {
    if (props.editMode) {
      const data = await getData(id);

      const formData = {
        id: data.id ?? -1,
        name: data.name ?? "",
        course: data.course ?? "",
        score: data.score ?? 0,
      };

      if (data) {
        setEditMode(true);
        setData(formData);
      } else {
        alert("Data sudah tidak ada di database.");
        history.push("/tugas15");
      }
    }
  }, []);

  const changeHandler = (e) => {
    const nama = e.target.name;
    let value;
    if (e.target.id === "nilai") {
      value = isNaN(parseInt(e.target.value)) ? "" : parseInt(e.target.value);
    } else {
      value = e.target.value ?? "";
    }

    setData({ ...data, [nama]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { id, ...inputData } = data;
    let isSuccess = false;

    if (editMode) {
      isSuccess = await updateData(id, inputData);
    } else {
      isSuccess = await addData(inputData);
    }

    if (isSuccess) {
      setData(DEFAULT_DATA);
      setEditMode(false);
      history.push("/tugas15");
    } else {
      alert(
        `Proses ${
          editMode ? "pengeditan" : "penyimpanan"
        } data gagal. Silahkan coba lagi nanti.`
      );
    }
  };

  return (
    <div className="form">
      <h2>Form Nilai Mahasiswa</h2>
      <form action="#" method="GET" onSubmit={submitHandler}>
        <div className="form-component">
          <label htmlFor="nama">Nama Mahasiswa</label>
          <input
            type="text"
            id="nama"
            name="name"
            value={data.name}
            placeholder="Masukkan Nama Mahasiswa"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="mata-kuliah">Mata Kuliah</label>
          <input
            type="text"
            name="course"
            id="mata-kuliah"
            placeholder="Masukkan Nama Mata Kuliah"
            value={data.course}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="nilai">Nilai</label>
          <input
            type="number"
            name="score"
            id="nilai"
            value={data.score}
            onChange={changeHandler}
            min="0"
            max="100"
            required
          />
        </div>
        <div className="form-control">
          <button type="submit">
            {editMode ? "Edit Data" : "Tambah Data"}
          </button>
        </div>
      </form>
      <Link to="/tugas15">Kembali ke tabel</Link>
    </div>
  );
}

FormMahasiswa.propTypes = {
  editMode: PropTypes.bool,
};

export default FormMahasiswa;
