import jwt from "jsonwebtoken"
import "dotenv/config"

// 受保护路由的鉴权中间件：必须携带有效 token，否则拒绝访问
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required",
      code: 4
    })
  }

  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token has expired",
          code: 6
        })
      }
      return res.status(403).json({
        message: "Invalid token",
        code: 2
      })
    }
    req.user = { id: decoded.userId, username: decoded.username }
    next()
  })
}

// 可选鉴权：有有效 token 就附带用户信息，没有也放行（用于公开但可个性化的接口）
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next()
  }
  const token = authHeader.split(" ")[1]
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (!err && decoded) {
      req.user = { id: decoded.userId, username: decoded.username }
    }
    next()
  })
}

export { requireAuth, optionalAuth }
