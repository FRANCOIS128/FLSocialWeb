import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { Prisma } from '@prisma/client';
dotenv.config();

import { login } from './src/api/login.js';
import { register } from './src/api/register.js';
import { me } from './src/api/me.js';
import { getFeed, createPost, toggleLike } from './src/api/posts.js';
import { requireAuth, optionalAuth } from './src/utils/authToken.js';

const app = express();

app.use(helmet());
// 生产环境通过 CORS_ORIGIN 限定来源；未设置时允许所有来源（便于本地开发）
const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim())
  : "*";
app.use(cors({ origin: corsOrigin }));
app.use(bodyParser.json());

// 对认证接口做频率限制，缓解暴力破解
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later", code: "5" }
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// Auth
app.post("/api/login", authLimiter, login);
app.post("/api/register", authLimiter, register);
app.get("/api/me", requireAuth, me);

// Posts
app.get("/api/posts", optionalAuth, getFeed);
app.post("/api/posts", requireAuth, createPost);
app.post("/api/posts/:id/like", requireAuth, toggleLike);

// Prisma 错误处理中间件
app.use((err, req, res, next) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          error: '唯一性约束冲突',
          field: err.meta?.target
        });
      case 'P2025':
        return res.status(404).json({
          error: '记录未找到'
        });
      case 'P2003':
        return res.status(400).json({
          error: '外键约束失败'
        });
      default:
        console.error('Prisma Error:', err);
        return res.status(500).json({
          error: '数据库操作失败'
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: '数据验证失败'
    });
  }

  next(err);
});

const port = process.env.PORT || 9090;
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
