import { User } from "./UserAPI";
import axios from "axios";

const API_URL = "https://backendexample.sanbersy.com/api/data-movie";

function dataTransform(obj) {
  return {
    id: obj.id ?? 0,
    description: obj.description ?? "",
    duration: obj.duration ?? 0,
    genre: obj.genre ?? "",
    imageURL: obj.image_url ?? "",
    rating: obj.rating ?? 0,
    review: obj.review ?? "",
    title: obj.title ?? "No Name",
    year: obj.year ?? 0,
  };
}

function dataTransformForServer(obj) {
  return {
    description: obj.description,
    duration: obj.duration,
    genre: obj.genre,
    image_url: obj.imageURL,
    rating: obj.rating,
    review: obj.review,
    title: obj.title,
    year: obj.year,
  };
}

function notfound() {
  return confirm(
    "Data tidak berada pada database. Apakah anda ingin menambahkannya saja?"
  );
}

async function fetchMovie(id = null) {
  try {
    if (!id) {
      const data = await axios.get(API_URL);

      return data.data.map((el) => dataTransform(el));
    } else {
      const dataFetch = await axios.get(`${API_URL}/${id}`);

      return dataTransform(dataFetch.data);
    }
  } catch (e) {
    console.error("Terjadi kesalahan saat pengambilan data.");
    return null;
  }
}

async function addMovie(userObj, data) {
  if (userObj instanceof User) {
    const token = userObj.token;
    const body = dataTransformForServer(data);

    try {
      await axios.post(API_URL, body, {
        headers: {
          Authorization: token,
        },
      });

      return true;
    } catch (e) {
      console.error("Gagal menambahkan data");
      return false;
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

async function editMovie(userObj, data, notfoundCallback = notfound) {
  if (userObj instanceof User) {
    const token = userObj.token;
    const body = dataTransformForServer(data);
    const id = data.id;

    try {
      await axios.put(`${API_URL}/${id}`, body, {
        headers: {
          Authorization: token,
        },
      });

      return true;
    } catch (e) {
      if (e.response.status === 404 && notfoundCallback()) {
        return addMovie(userObj, data);
      } else {
        console.error(`Gagal mengedit data. Status: ${e.response.status}`);
        return false;
      }
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

async function deleteMovie(userObj, id) {
  if (userObj instanceof User) {
    const token = userObj.token;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      return true;
    } catch (e) {
      console.error("Gagal menghapus data.");
      return false;
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

export { fetchMovie, editMovie, addMovie, deleteMovie };
