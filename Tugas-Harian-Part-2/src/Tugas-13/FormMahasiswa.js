import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DEFAULT_STATE = {
  data: {
    id: -1,
    nama: "",
    mataKuliah: "",
    nilai: 0,
  },
  isUpdated: false,
};

const FormMahasiswa = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  useEffect(() => {
    if (props.isEditMode && !state.isUpdated) {
      setState({
        ...state,
        data: props.editData,
        isUpdated: true,
      });
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (props.isEditMode) await props.onApplyEdit(state.data);
    else await props.onAddData(state.data);

    setState(DEFAULT_STATE);
  };

  const changeHandler = (e) => {
    const nama = e.target.name;
    const value =
      e.target.id === "nilai" ? parseInt(e.target.value) ?? "" : e.target.value;

    setState({
      ...state,
      data: {
        ...state.data,
        [nama]: value,
      },
    });
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
            name="nama"
            value={state.data.nama}
            placeholder="Masukkan Nama Mahasiswa"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="mata-kuliah">Mata Kuliah</label>
          <input
            type="text"
            name="mataKuliah"
            id="mata-kuliah"
            placeholder="Masukkan Nama Mata Kuliah"
            value={state.data.mataKuliah}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="form-component">
          <label htmlFor="nilai">Nilai</label>
          <input
            type="number"
            name="nilai"
            id="nilai"
            value={state.data.nilai}
            onChange={changeHandler}
            min="0"
            max="100"
            required
          />
        </div>
        <div className="form-control">
          <button type="submit">
            {props.isEditMode ? "Edit Data" : "Tambah Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

FormMahasiswa.propTypes = {
  isEditMode: PropTypes.bool,
  editData: PropTypes.exact({
    id: PropTypes.number,
    nama: PropTypes.string,
    mataKuliah: PropTypes.string,
    nilai: PropTypes.number,
  }),
  onAddData: PropTypes.func,
  onApplyEdit: PropTypes.func,
};

export default FormMahasiswa;
