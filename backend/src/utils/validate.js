// 简单的输入校验，返回错误信息字符串；通过则返回 null
function validateCredentials({ username, password }) {
  if (typeof username !== "string" || typeof password !== "string") {
    return "username and password are required";
  }
  const name = username.trim();
  if (name.length < 3 || name.length > 20) {
    return "username must be between 3 and 20 characters";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    return "username can only contain letters, numbers and underscores";
  }
  if (password.length < 6 || password.length > 64) {
    return "password must be between 6 and 64 characters";
  }
  return null;
}

// 注册时随机分配一个内置头像，避免新用户没有头像
function randomAvatar() {
  const n = Math.floor(Math.random() * 12) + 1;
  return `/images/profile/profile_${n}.png`;
}

export {
  validateCredentials,
  randomAvatar
}
