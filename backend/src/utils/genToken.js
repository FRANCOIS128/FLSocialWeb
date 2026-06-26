import jwt from "jsonwebtoken";
import "dotenv/config";

// 只在 token 中存放非敏感的标识信息（绝不放密码哈希）
function genToken(payload, expireTime = "1d") {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expireTime
  });
}

export {
  genToken
}
