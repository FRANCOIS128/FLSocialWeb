import { findPublicUserById } from "../utils/getUsers.js";

// 根据 token 返回当前登录用户信息，用于刷新页面后的自动登录
async function me(req, res) {
  try {
    const user = await findPublicUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        code: "1"
      });
    }

    res.status(200).json({
      message: "ok",
      code: "0",
      user
    });
  } catch (error) {
    console.error('获取用户信息失败：', error);
    res.status(500).json({
      message: "Internal Server Error",
      code: "3"
    });
  }
}

export { me }
