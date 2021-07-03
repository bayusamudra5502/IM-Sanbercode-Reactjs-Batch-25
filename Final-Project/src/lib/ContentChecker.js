import axios from "axios";

export async function checkImage(src) {
  try {
    const response = await axios.get(src);
    const regex = /image\/.*/g;
    const isImage = regex.test(response.headers["content-type"]);

    return { status: response.status, isImage };
  } catch (e) {
    if (e.response) {
      return { status: e.response.status };
    } else {
      console.dir(e);
      return { status: -1 };
    }
  }
}
