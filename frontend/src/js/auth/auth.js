import * as dom from "./dom.js";
import { clearDomValue, isInputHasContent } from "./utils.js";
import * as animation from "./animation.js";
import { authApi, tokenStore } from "@/js/api.js";
import { enterFeed } from "@/js/feed.js";

function enterApp(user) {
  dom.navUsername.innerText = user.displayName || user.username;
  animation.AuthToApp();
  enterFeed(user);
}

async function login(event) {
  event.preventDefault();
  if (isInputHasContent([dom.username, dom.password]) === 1) {
    animation.showError();
    return;
  }

  try {
    const response = await authApi.login(dom.username.value, dom.password.value);

    if (response.code === "0") {
      clearDomValue([dom.username, dom.password]);
      animation.showCorrect();
      tokenStore.set(response.token);
      enterApp(response.user);
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
    const response = await authApi.register(
      dom.new_username.value,
      dom.password_one.value
    );

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
  tokenStore.clear();
  animation.AppToAuth();
}

// 页面加载时用本地 token 自动登录
async function checkToken() {
  const token = tokenStore.get();
  if (!token) return;

  try {
    const response = await authApi.me();
    if (response.code === "0") {
      enterApp(response.user);
    }
  } catch (error) {
    tokenStore.clear();
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
