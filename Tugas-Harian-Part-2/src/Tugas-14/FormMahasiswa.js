import React, { useState, useEffect, useContext } from "react";
import { ActionContext } from "./MahasiswaContext";
import { updateData, addData, deleteData, getData } from "./API";

const DEFAULT_DATA = {
  id: -1,
  name: "",
  course: "",
  score: 0,
};

function FormMahasiswa() {
  const [actionData, setAction] = useContext(ActionContext);
  const [data, setData] = useState(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);

  useEffect(async () => {
    if (actionData.mode === "EDIT") {
      // Mode Edit
      const data = await getData(actionData.id);

      const formData = {
        id: data.id ?? -1,
        name: data.name ?? "",
        course: data.course ?? "",
        score: data.score ?? 0,
      };

      if (data) setEditMode(true);

      setData(formData);
      setAction({ mode: "NONE", id: -1 });
    }
  }, [actionData]);

  useEffect(async () => {
    if (actionData.mode === "DELETE") {
      (await deleteData(actionData.id)) &&
        setAction({ mode: "UPDATE", id: -1 });
    }
  }, [actionData]);

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
      setAction({ ...actionData, mode: "UPDATE" });
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
    </div>
  );
}

export default FormMahasiswa;
