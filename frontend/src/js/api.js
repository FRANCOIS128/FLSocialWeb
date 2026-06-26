import axios from "axios";

const backendPath = import.meta.env.VITE_BACKEND_PATH;
const loginToken = import.meta.env.VITE_LOGIN_TOKEN;

export const tokenStore = {
  get: () => localStorage.getItem(loginToken),
  set: (token) => localStorage.setItem(loginToken, token),
  clear: () => localStorage.removeItem(loginToken)
};

const api = axios.create({ baseURL: backendPath });

// 自动给每个请求附带 token
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (username, password) =>
    api.post("/api/login", { username, password }).then((r) => r.data),
  register: (username, password) =>
    api.post("/api/register", { username, password }).then((r) => r.data),
  me: () => api.get("/api/me").then((r) => r.data)
};

export const postApi = {
  feed: () => api.get("/api/posts").then((r) => r.data),
  create: (content, imageUrl) =>
    api.post("/api/posts", { content, imageUrl }).then((r) => r.data),
  toggleLike: (postId) =>
    api.post(`/api/posts/${postId}/like`).then((r) => r.data)
};

export default api;
