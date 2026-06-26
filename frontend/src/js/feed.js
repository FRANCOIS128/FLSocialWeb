import { postApi } from "@/js/api.js";
import { cardList } from "@/js/common.js";

let formInitialized = false;

// 加载信息流并渲染到中间栏
export async function loadFeed() {
  try {
    const res = await postApi.feed();
    if (res.code === "0") {
      cardList.render(res.posts);
    }
  } catch (error) {
    console.warn("load feed failed", error?.response?.status);
    cardList.render([]);
  }
}

// 绑定发帖表单（只绑定一次）
function initForm() {
  if (formInitialized) return;
  const form = document.querySelector(".main-middle form.create-post");
  if (!form) return;

  const input = form.querySelector("#create-post");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content) return;

    try {
      const res = await postApi.create(content);
      if (res.code === "0") {
        cardList.prepend(res.post);
        input.value = "";
      }
    } catch (error) {
      console.warn("create post failed", error?.response?.status);
    }
  });

  formInitialized = true;
}

// 用当前登录用户的信息更新头像、用户名等展示
function applyUser(user) {
  const name = user.displayName || user.username;

  const navImg = document.querySelector("nav .create .profile-photo img");
  if (navImg) navImg.src = user.avatar;

  const createImg = document.querySelector(".main-middle form.create-post .profile-photo img");
  if (createImg) createImg.src = user.avatar;

  const createInput = document.querySelector(".main-middle form.create-post #create-post");
  if (createInput) createInput.placeholder = `What is on your mind, ${name} ?`;

  const leftProfile = document.querySelector(".main-left .profile");
  if (leftProfile) {
    const h2 = leftProfile.querySelector("h2");
    const p = leftProfile.querySelector("p");
    const img = leftProfile.querySelector("img");
    if (h2) h2.textContent = name;
    if (p) p.textContent = `@${user.username}`;
    if (img) img.src = user.avatar;
  }
}

// 登录成功后进入应用：填充用户信息 + 加载信息流
export async function enterFeed(user) {
  initForm();
  applyUser(user);
  await loadFeed();
}
