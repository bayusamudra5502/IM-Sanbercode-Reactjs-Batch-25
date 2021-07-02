import axios from "axios";

const API_URL = "https://backendexample.sanbersy.com/api";
const SESSION_KEY = "SESSION";

class User {
  constructor({ user, token }) {
    this.__user = user;
    this.__token = token;
  }

  get status() {
    return 0;
  }

  get token() {
    return `Bearer ${this.__token}`;
  }

  get name() {
    return this.__user.name;
  }

  stringify() {
    const obj = {
      user: {
        name: this.__user.name,
      },
      token: this.__token,
      timestamp: new Date().getTime(),
    };

    return JSON.stringify(obj);
  }
}

function getSession() {
  const data = localStorage.getItem(SESSION_KEY);

  if (data) {
    const decoded = atob(data);
    const userObj = JSON.parse(decoded);

    return new User(userObj);
  } else {
    return null;
  }
}

function destroySession() {
  localStorage.removeItem(SESSION_KEY);
}

function setSession(userObj) {
  const strObj = userObj.stringify();
  const encode = btoa(strObj);
  localStorage.setItem(SESSION_KEY, encode);

  return true;
}

async function login({ email, password }) {
  try {
    const result = await axios.post(`${API_URL}/user-login`, {
      email,
      password,
    });

    const userObj = new User(result.data);
    setSession(userObj);

    return userObj;
  } catch (e) {
    if (e.response.status === 400) {
      return { status: 1 };
    } else {
      console.error("Terjadi kesalahan saat login.");
      return null;
    }
  }
}

async function register({ name, email, password }) {
  try {
    const result = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });

    const userObj = new User(result.data);
    setSession(userObj);

    return userObj;
  } catch (e) {
    if (e.response.status === 400) {
      return { status: 1 };
    } else {
      console.error("Terjadi kesalahan saat register user baru.");
      return null;
    }
  }
}

async function changePassword(
  userObj,
  { current_password, new_password, new_confirm_password }
) {
  const token = userObj.token;
  const body = { current_password, new_password, new_confirm_password };

  try {
    await axios.post(`${API_URL}/change-password`, body, {
      headers: {
        Authorization: token,
      },
    });

    return true;
  } catch (e) {
    if (e.response.status === 400) {
      return { status: 1 };
    } else {
      console.error("Terjadi kesalahan saat mengubah kata sandi.");
      return null;
    }
  }
}

export { changePassword, getSession, destroySession, login, register, User };
