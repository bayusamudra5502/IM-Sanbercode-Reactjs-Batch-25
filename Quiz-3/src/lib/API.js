import axios from "axios";

const URL_BASE = "http://backendexample.sanbercloud.com/api/mobile-apps";

function dataTransform(data, addInfo = false) {
  const { created_at, updated_at, ...result } = data;

  return addInfo ? { created_at, updated_at, ...result } : result;
}

async function fetchData() {
  try {
    const data = (await axios.get(URL_BASE)).data;
    return data.map((el) => dataTransform(el));
  } catch (e) {
    console.error("Pengambilan data gagal.");
    return [];
  }
}

async function addData(obj) {
  try {
    await axios.post(URL_BASE, obj);
    return true;
  } catch (e) {
    console.error("Penambahan data gagal.");
    return false;
  }
}

async function getDataById(id) {
  try {
    const data = (await axios.get(`${URL_BASE}/${id}`)).data ?? {};
    return dataTransform(data);
  } catch (e) {
    console.error("Pengambilan data gagal.");
    return {};
  }
}

async function editData(id, newData) {
  try {
    await axios.put(`${URL_BASE}/${id}`, newData);
    return true;
  } catch (e) {
    if (e.response.status === 404) {
      if (
        confirm(
          "Data sudah tidak ada di database. Apakah anda ingin menambahkannya saja?"
        )
      ) {
        return addData(newData);
      } else {
        console.log("Data sudah tidak ada. Tidak dilakukan apa-apa.");
      }

      return true;
    } else {
      console.error("Terjadi kesalahan saat mengedit data di database.");
      return false;
    }
  }
}

async function deleteData(id) {
  try {
    await axios.delete(`${URL_BASE}/${id}`);
    return true;
  } catch (e) {
    if (e.response.status === 404) {
      console.log("Data sudah tidak ada. Tidak dilakukan apa-apa.");
      return true;
    } else {
      console.error("Terjadi kesalahan saat mennghapus data");
      return false;
    }
  }
}

export { fetchData, addData, getDataById, editData, deleteData };
