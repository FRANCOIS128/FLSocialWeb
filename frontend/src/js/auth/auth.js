import axios from "axios";
import * as dom from "./dom.js";
import { clearDomValue, isInputHasContent } from "./utils.js";
import * as animation from "./animation.js";

const backendPath = import.meta.env.VITE_BACKEND_PATH;
const loginToken = import.meta.env.VITE_LOGIN_TOKEN;

function enterApp(username) {
  dom.navUsername.innerText = username;
  animation.AuthToApp();
}

async function login(event) {
  event.preventDefault();
  if (isInputHasContent([dom.username, dom.password]) === 1) {
    animation.showError();
    return;
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/login`,
      {
        username: dom.username.value,
        password: dom.password.value
      }
    ).then(res => res.data);

    if (response.code === "0") {
      clearDomValue([dom.username, dom.password]);
      animation.showCorrect();
      response.token && localStorage.setItem(loginToken, response.token);
      enterApp(response.username);
    }
  } catch (error) {
    const code = error?.response?.data?.code;
    switch (code) {
      case "1":
      case "2":
        animation.showError();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

async function register(event) {
  event.preventDefault();
  const statusCode = isInputHasContent([
    dom.new_username,
    dom.password_one,
    dom.password_two
  ]);

  if (statusCode !== 0 || dom.password_one.value !== dom.password_two.value) {
    animation.showError();
    return;
  }

  try {
    const response = await axios.post(
      `${backendPath}/api/register`,
      {
        username: dom.new_username.value,
        password: dom.password_one.value,
      }
    ).then(res => res.data);

    if (response.code === "0") {
      clearDomValue([
        dom.new_username,
        dom.password_one,
        dom.password_two
      ]);
      animation.showCorrect();
      animation.RegisterToLogin();
    }
  } catch (error) {
    const code = error?.response?.data?.code;
    switch (code) {
      case "1":
      case "2":
        animation.showError();
        break;
      default:
        animation.showUnknown();
        break;
    }
  }
}

function signOut(event) {
  event.preventDefault();
  clearDomValue([
    dom.username,
    dom.password,
    dom.new_username,
    dom.password_one,
    dom.password_two
  ]);
  dom.navUsername.innerText = "";
  localStorage.removeItem(loginToken);
  animation.AppToAuth();
}

// 页面加载时用本地 token 自动登录
async function checkToken() {
  const token = localStorage.getItem(loginToken);
  if (!token) return;

  try {
    const response = await axios.post(
      `${backendPath}/api/login`,
      { message: "token" },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.data);

    if (response.code === "0") {
      response.token && localStorage.setItem(loginToken, response.token);
      enterApp(response.username);
    }
  } catch (error) {
    localStorage.removeItem(loginToken);
  }
}

export function initAuth() {
  dom.toLoginBtn.addEventListener('click', (event) => {
    event.preventDefault();
    animation.RegisterToLogin();
  });

  dom.toRegisterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    animation.LoginToRegister();
  });

  dom.loginBtn.addEventListener('click', login);
  dom.registerBtn.addEventListener('click', register);
  dom.signOutBtn.addEventListener('click', signOut);

  checkToken();
}
