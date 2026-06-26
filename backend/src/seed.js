import "dotenv/config";
import prisma from "./lib/prisma.js";
import { encryption } from "./utils/cryption.js";

// 生成演示数据：方便部署后在 README 里提供一个公开体验账号
async function seed() {
  const demoUsers = [
    {
      username: "demo",
      password: "demo123",
      displayName: "Demo User",
      avatar: "/images/profile/profile_1.png"
    },
    {
      username: "lana_rose",
      password: "lana123",
      displayName: "Lana Rose",
      avatar: "/images/profile/profile_2.png"
    },
    {
      username: "ernest",
      password: "ernest123",
      displayName: "Ernest Achiever",
      avatar: "/images/profile/profile_5.png"
    }
  ];

  const created = {};
  for (const u of demoUsers) {
    const password = await encryption(u.password);
    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: {
        username: u.username,
        password,
        displayName: u.displayName,
        avatar: u.avatar
      }
    });
    created[u.username] = user;
  }

  const posts = [
    { author: "lana_rose", content: "Golden hour never disappoints. #lifestyle", imageUrl: "/images/post/post_5.jpeg" },
    { author: "ernest", content: "Shipped a new feature today. Feels good to build things that people use.", imageUrl: "/images/post/post_7.jpeg" },
    { author: "demo", content: "Welcome to FLsocial! This is a full-stack demo — try posting and liking.", imageUrl: "/images/post/post_9.jpeg" },
    { author: "lana_rose", content: "Weekend vibes.", imageUrl: "/images/post/post_6.jpeg" }
  ];

  // 避免重复 seed：仅当没有任何帖子时才插入
  const existingPosts = await prisma.post.count();
  if (existingPosts === 0) {
    for (const p of posts) {
      await prisma.post.create({
        data: {
          content: p.content,
          imageUrl: p.imageUrl,
          authorId: created[p.author].id
        }
      });
    }
  }

  console.log("Seed 完成 ✅  演示账号: demo / demo123");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
