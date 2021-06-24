import React, { useContext, useState, useEffect } from "react";
import { DataMahasiswaContext, ActionContext } from "./MahasiswaContext";
import RowMahasiswa from "./RowMahasiswa";
import { getData } from "./API";

const UPDATE_INTERVAL = 1000;
const USE_UPDATER = true;

export default function TableMahasiswa() {
  const [actionData, setAction] = useContext(ActionContext);
  const [dataMahasiswa, setDataMahasiswa] = useContext(DataMahasiswaContext);

  const [updaterObj, setUpdater] = useState(null);

  const updateDataMahasiswa = async () => {
    const newData = await getData();
    if (JSON.stringify(newData) !== JSON.stringify(dataMahasiswa)) {
      setDataMahasiswa(newData);
    }
  };

  useEffect(() => {
    if (!updaterObj && USE_UPDATER) {
      const intervalObj = setInterval(async () => {
        await updateDataMahasiswa();
      }, UPDATE_INTERVAL);

      setUpdater(intervalObj);

      return () => clearInterval(updaterObj);
    }
  }, []);

  useEffect(async () => {
    if (actionData.mode === "UPDATE") {
      await updateDataMahasiswa();
      setAction({ ...actionData, mode: "NONE" });
    }
  }, [actionData]);

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
