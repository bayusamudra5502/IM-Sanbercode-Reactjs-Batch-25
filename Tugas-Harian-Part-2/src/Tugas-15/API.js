import axios from "axios";
const URL_BASE = "http://backendexample.sanbercloud.com/api/student-scores";

function dataTransform({ name, course, id, score }) {
  return { id, name, course, score };
}

async function getData(id = null) {
  try {
    if (id) {
      const fecthedData = await axios.get(`${URL_BASE}/${id}`);
      return dataTransform(fecthedData.data);
    } else {
      const fecthedData = await axios.get(URL_BASE);
      return fecthedData.data.map((data) => dataTransform(data));
    }
  } catch (e) {
    console.error("Data gagal diambil.");
    return [];
  }
}

async function addData(data) {
  try {
    await axios.post(URL_BASE, data);
    return true;
  } catch (e) {
    console.error("Gagal menyimpan data.");
    return false;
  }
}

async function updateData(id, data) {
  try {
    await axios.put(`${URL_BASE}/${id}`, data);
    return true;
  } catch (e) {
    if (e.response.status === 404) {
      if (
        confirm(
          "Data sudah tidak ada di database. Apakah anda ingin menambahkannya saja?"
        )
      ) {
        addData(data);
      } else {
        console.info("Data sudah tidak ada. Tidak dilakukan apa-apa");
      }
      return true;
    } else {
      console.warn("Terjadi kesalahan pada saat pengeditan data.");
    }
  }

  return false;
}

async function deleteData(id) {
  try {
    await axios.delete(`${URL_BASE}/${id}`);
    return true;
  } catch (e) {
    if (e.response.status === 404) {
      console.info("Data sudah tidak ada. Tidak dilakukan apa-apa");
      return true;
    } else {
      console.warn("Terjadi kesalahan pada saat penghapusan data.");
    }
  }

  return false;
}

export { deleteData, addData, updateData, getData };
