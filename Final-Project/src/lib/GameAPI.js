import { User } from "./UserAPI";
import axios from "axios";

const API_URL = "https://backendexample.sanbersy.com/api/data-game";

function dataTransform(obj) {
  return {
    id: obj.id ?? 0,
    genre: obj.genre ?? "",
    imageURL: obj.image_url ?? "",
    singleplayer: Boolean(obj.singlePlayer) ?? false,
    multiplayer: Boolean(obj.multiplayer) ?? false,
    name: obj.name ?? "",
    platform: obj.platform ?? "",
    release: obj.release ?? "",
  };
}

function dataTransformForServer(obj) {
  return {
    genre: obj.genre,
    image_url: obj.imageURL,
    singlePlayer: Boolean(obj.singleplayer),
    multiplayer: Boolean(obj.multiplayer),
    name: obj.name,
    platform: obj.platform,
    release: obj.release,
  };
}

function notfound() {
  return confirm(
    "Data tidak berada pada database. Apakah anda ingin menambahkannya saja?"
  );
}

async function fetchGame(id = null) {
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

async function addGame(userObj, data) {
  if (userObj instanceof User) {
    const token = userObj.token;
    const body = dataTransformForServer(data);

    try {
      await axios.post(API_URL, body, {
        headers: {
          Authorization: token,
        },
      });

      return { status: true };
    } catch (e) {
      if (e.response.status === 400) {
        const regex = /token/gi;

        if (regex.test(e.response.data?.status ?? "")) {
          return { status: false, data: "Token Error" };
        } else {
          return { status: false };
        }
      } else {
        console.error("Gagal menambahkan data");
        return { status: false };
      }
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

async function editGame(userObj, data, notfoundCallback = notfound) {
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

      return { status: true };
    } catch (e) {
      if (e.response.status === 404 && notfoundCallback()) {
        return addGame(userObj, data);
      } else if (e.response.status === 400) {
        const regex = /token/gi;

        if (regex.test(e.response.data?.status ?? "")) {
          return { status: false, data: "Token Error" };
        } else {
          return { status: false };
        }
      } else {
        console.error(`Gagal mengedit data. Status: ${e.response.status}`);
        return { status: false };
      }
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

async function deleteGame(userObj, id) {
  if (userObj instanceof User) {
    const token = userObj.token;

    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      return { status: true };
    } catch (e) {
      if (e.response.status === 400) {
        const regex = /token/gi;

        if (regex.test(e.response.data?.status ?? "")) {
          return { status: false, data: "Token Error" };
        } else {
          return { status: false };
        }
      } else {
        console.error("Gagal menghapus data.");
        return { status: false };
      }
    }
  } else {
    throw {
      error: -1,
      msg: "userObj bukan merupakan instance dari User",
    };
  }
}

export { fetchGame, editGame, addGame, deleteGame };
