import user from "./user.json";

const LOGIN_KEY = "LOGIN_ID";

function isValidLogin(username, password) {
  return user.reduce((res, data) => {
    return res || (username === data.username && password === data.password);
  }, false);
}

function setLogin(username) {
  localStorage.setItem(LOGIN_KEY, username);
}

function resetLogin() {
  localStorage.removeItem(LOGIN_KEY);
}

function getLogin() {
  return localStorage.getItem(LOGIN_KEY);
}

export { isValidLogin, setLogin, resetLogin, getLogin };
