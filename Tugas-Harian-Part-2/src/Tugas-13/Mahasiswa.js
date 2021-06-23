import React, { useState, useEffect } from "react";
import axios from "axios";
import TabelMahasiswa from "./TabelMahasiswa";
import FormMahasiswa from "./FormMahasiswa";
import { transforDataFromServer, transformDataForServer } from "./util";
import "./Mahasiswa.css";

const URL_BASE = "http://backendexample.sanbercloud.com/api/student-scores/";
const UPDATE_INTERVAL = 5000;
const DEFAULT_STATE_UPDATE_DATA = {
  id: -1,
  nama: "",
  mataKuliah: "",
  nilai: 0,
};

let updater = null;

const Mahasiswa = () => {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(DEFAULT_STATE_UPDATE_DATA);

  const getAllData = async () => {
    try {
      const fetchData = await axios.get(URL_BASE.slice(0, -1));
      const transformData = fetchData.data.map(({ id, ...data }) => ({
        id,
        ...transforDataFromServer(data),
      }));

      setData(transformData);
    } catch (e) {
      console.log(e.message);
      console.warn("Terjadi kesalahan pada saat pengambilan data.");
    }
  };

  useEffect(() => {
    getAllData().then();
    updater = setInterval(async () => {
      getAllData();
    }, UPDATE_INTERVAL);

    return () => {
      clearInterval(updater);
    };
  }, []);

  const applyUpdateHandler = async ({ id, ...data }) => {
    try {
      const URL_DEST = URL_BASE + id.toString();
      await axios.put(URL_DEST, transformDataForServer(data));

      setEditMode(false);
      setEditData(DEFAULT_STATE_UPDATE_DATA);
    } catch (e) {
      console.warn("Terjadi kesalahan pada saat pengambilan data.");
    } finally {
      await getAllData();
    }
  };

  const addDataHandler = async (data) => {
    try {
      const dataWillSend = transformDataForServer(data);
      await axios.post(URL_BASE.slice(0, -1), dataWillSend);
    } catch (e) {
      console.warn("Terjadi kesalahan pada saat pengambilan data.");
    } finally {
      await getAllData();
    }
  };

  const editTriggerHandler = async (idTrigger) => {
    try {
      const URL_DEST = URL_BASE + idTrigger.toString();
      const editData = (await axios.get(URL_DEST)).data;
      setEditData({ ...transforDataFromServer(editData), id: editData.id });
      setEditMode(true);
    } catch (e) {
      console.log("Terjadi Kesalahan saat pengambilan data");
    }
  };

  const deleteHandler = async (idTrigger) => {
    try {
      const URL_DEST = URL_BASE + idTrigger.toString();
      await axios.delete(URL_DEST);
    } catch (e) {
      console.warn("Terjadi kesalahan saat pengambilan data");
    } finally {
      await getAllData();
    }
  };

  return (
    <div className="container">
      <TabelMahasiswa
        data={data}
        onEdit={editTriggerHandler}
        onDelete={deleteHandler}
      />
      <FormMahasiswa
        onAddData={addDataHandler}
        isEditMode={editMode}
        onApplyEdit={applyUpdateHandler}
        editData={editData}
      />
    </div>
  );
};

export default Mahasiswa;
