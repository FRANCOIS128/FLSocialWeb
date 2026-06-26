import { findUserByName } from "../utils/getUsers.js";
import { encryption } from "../utils/cryption.js";
import { postUser } from "../utils/postUser.js";
import { validateCredentials, randomAvatar } from "../utils/validate.js";

async function register(req, res) {
  try {
    const { username, password } = req.body;

    const validationError = validateCredentials({ username, password });
    if (validationError) {
      return res.status(400).json({
        message: validationError,
        code: "2"
      });
    }

    const name = username.trim();
    const existingUser = await findUserByName(name);
    if (existingUser) {
      return res.status(409).json({
        message: "username already exists",
        code: "1",
        username: name
      });
    }

    const encryptionPassword = await encryption(password);
    await postUser({
      username: name,
      password: encryptionPassword,
      displayName: name,
      avatar: randomAvatar()
    });

    res.status(201).json({
      message: "user created",
      code: "0",
      username: name
    });

  } catch (error) {
    console.error('注册失败：', error);
    return res.status(500).json({
      message: "internal server error",
      code: "3"
    });
  }
}

export { register }
