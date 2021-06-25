import React, { useContext, useEffect } from "react";
import { DataMahasiswaContext } from "./MahasiswaContext";
import RowMahasiswa from "./RowMahasiswa";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getData } from "./API";

const UPDATE_INTERVAL = 3000;
const USE_UPDATER = true;

export default function TableMahasiswa() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const [dataMahasiswa, setDataMahasiswa] = useContext(DataMahasiswaContext);
  let intervalObj = null;

  const startUpdater = (updater) => {
    if (USE_UPDATER) {
      intervalObj && stopUpdater();

      const intObj = setInterval(updater, UPDATE_INTERVAL);
      intervalObj = intObj;
    }
  };

  const stopUpdater = () => {
    if (intervalObj) {
      clearInterval(intervalObj);
      intervalObj = null;
    }
  };

  const updateDataMahasiswa = async () => {
    const newData = await getData();
    if (
      JSON.stringify(newData) !== JSON.stringify(dataMahasiswa) &&
      newData !== []
    ) {
      setDataMahasiswa(newData);
    }
  };

  useEffect(() => {
    updateDataMahasiswa().then(() =>
      startUpdater(async () => await updateDataMahasiswa())
    );
  }, []);

  useEffect(() => {
    return () => {
      stopUpdater();
    };
  }, []);

  return (
    <div className="tabel">
      <h2>Daftar Nilai Mahasiswa</h2>
      <button
        style={{ margin: "20px 0" }}
        onClick={() => history.push(`${url}/create`)}
      >
        Tambah Data Baru
      </button>
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
          {dataMahasiswa.map((data, index) => {
            return (
              <RowMahasiswa key={data.id} dataMahasiswa={{ ...data, index }} />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
