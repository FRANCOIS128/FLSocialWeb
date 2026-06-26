import * as dom from "./dom.js";
import { clearDomValue, isInputHasContent } from "./utils.js";
import * as animation from "./animation.js";
import { authApi, tokenStore } from "@/js/api.js";
import { enterFeed } from "@/js/feed.js";

function setMessage(el, text, type = "error") {
  el.textContent = text;
  el.classList.remove("error", "success");
  el.classList.add(type, "show");
}

function clearMessage(el) {
  el.textContent = "";
  el.classList.remove("show", "error", "success");
}

function enterApp(user) {
  dom.navUsername.innerText = user.displayName || user.username;
  animation.AuthToApp();
  enterFeed(user);
}

async function login(event) {
  event.preventDefault();
  clearMessage(dom.loginMessage);

  if (isInputHasContent([dom.username, dom.password]) === 1) {
    animation.showError();
    setMessage(dom.loginMessage, "Please enter your username and password.");
    return;
  }

  try {
    const response = await authApi.login(dom.username.value, dom.password.value);

    if (response.code === "0") {
      clearDomValue([dom.username, dom.password]);
      clearMessage(dom.loginMessage);
      animation.showCorrect();
      tokenStore.set(response.token);
      enterApp(response.user);
    }
  } catch (error) {
    animation.showError();
    const code = error?.response?.data?.code;
    if (code === "1") {
      setMessage(dom.loginMessage, "Incorrect username or password.");
    } else if (code === "2") {
      setMessage(dom.loginMessage, "Please enter your username and password.");
    } else if (code === "5") {
      setMessage(dom.loginMessage, "Too many attempts. Please try again later.");
    } else {
      setMessage(dom.loginMessage, "Something went wrong. Please try again.");
    }
  }
}

async function register(event) {
  event.preventDefault();
  clearMessage(dom.registerMessage);

  if (isInputHasContent([dom.new_username, dom.password_one, dom.password_two]) !== 0) {
    animation.showError();
    setMessage(dom.registerMessage, "Please fill in all fields.");
    return;
  }

  if (dom.password_one.value !== dom.password_two.value) {
    animation.showError();
    setMessage(dom.registerMessage, "Passwords do not match.");
    return;
  }

  try {
    const response = await authApi.register(
      dom.new_username.value,
      dom.password_one.value
    );

    if (response.code === "0") {
      clearDomValue([dom.new_username, dom.password_one, dom.password_two]);
      animation.showCorrect();
      animation.RegisterToLogin();
      setMessage(dom.loginMessage, "Account created! Please sign in.", "success");
    }
  } catch (error) {
    animation.showError();
    const data = error?.response?.data;
    if (data?.code === "1") {
      setMessage(dom.registerMessage, "Username already taken.");
    } else if (data?.code === "2") {
      // 直接展示后端的具体校验信息（长度/字符等）
      setMessage(dom.registerMessage, data.message || "Invalid username or password.");
    } else if (data?.code === "5") {
      setMessage(dom.registerMessage, "Too many attempts. Please try again later.");
    } else {
      setMessage(dom.registerMessage, "Something went wrong. Please try again.");
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
  clearMessage(dom.loginMessage);
  clearMessage(dom.registerMessage);
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
    clearMessage(dom.registerMessage);
    animation.RegisterToLogin();
  });

  dom.toRegisterBtn.addEventListener('click', (event) => {
    event.preventDefault();
    clearMessage(dom.loginMessage);
    animation.LoginToRegister();
  });

  dom.loginBtn.addEventListener('click', login);
  dom.registerBtn.addEventListener('click', register);
  dom.signOutBtn.addEventListener('click', signOut);

  // 用户重新输入时清除错误提示
  [dom.username, dom.password].forEach((el) =>
    el.addEventListener("input", () => clearMessage(dom.loginMessage))
  );
  [dom.new_username, dom.password_one, dom.password_two].forEach((el) =>
    el.addEventListener("input", () => clearMessage(dom.registerMessage))
  );

  checkToken();
}
