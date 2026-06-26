import bcrypt from "bcryptjs"
import { findUserByName } from "../utils/getUsers.js"
import { genToken } from "../utils/genToken.js";

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
        code: "2"
      });
    }

    const user = await findUserByName(username.trim());
    if (!user) {
      return res.status(401).json({
        message: "username or password is incorrect",
        code: "1"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "username or password is incorrect",
        code: "1"
      });
    }

    // token 只携带用户标识，绝不包含密码
    const token = genToken(
      { userId: user.id, username: user.username },
      process.env.TOKEN_EXPIRES_IN || "1d"
    );

    res.status(200).json({
      message: "login success",
      code: "0",
      token,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        bio: user.bio
      }
    });

  } catch (error) {
    console.error('登录失败：', error);
    res.status(500).json({
      message: "Internal Server Error",
      code: "3"
    });
  }
}

export { login }
