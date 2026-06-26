import prisma from "../lib/prisma.js";

const MAX_CONTENT_LENGTH = 500;

// 把数据库记录整理成前端需要的结构
function serializePost(post, currentUserId) {
  return {
    id: post.id,
    content: post.content,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    author: {
      id: post.author.id,
      username: post.author.username,
      displayName: post.author.displayName,
      avatar: post.author.avatar
    },
    likeCount: post._count.likes,
    likedByMe: currentUserId
      ? post.likes.some((like) => like.userId === currentUserId)
      : false
  };
}

const postInclude = {
  author: {
    select: { id: true, username: true, displayName: true, avatar: true }
  },
  _count: { select: { likes: true } },
  likes: { select: { userId: true } }
};

// GET /api/posts —— 信息流（公开，登录后会附带 likedByMe）
async function getFeed(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: postInclude
    });

    res.status(200).json({
      code: "0",
      posts: posts.map((p) => serializePost(p, req.user?.id))
    });
  } catch (error) {
    console.error("获取信息流失败：", error);
    res.status(500).json({ message: "Internal Server Error", code: "3" });
  }
}

// POST /api/posts —— 发帖（需要登录）
async function createPost(req, res) {
  try {
    const content = (req.body?.content || "").trim();
    const imageUrl = req.body?.imageUrl?.trim() || null;

    if (!content) {
      return res.status(400).json({ message: "content is required", code: "2" });
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return res.status(400).json({
        message: `content must be at most ${MAX_CONTENT_LENGTH} characters`,
        code: "2"
      });
    }

    const post = await prisma.post.create({
      data: { content, imageUrl, authorId: req.user.id },
      include: postInclude
    });

    res.status(201).json({ code: "0", post: serializePost(post, req.user.id) });
  } catch (error) {
    console.error("发帖失败：", error);
    res.status(500).json({ message: "Internal Server Error", code: "3" });
  }
}

// POST /api/posts/:id/like —— 点赞 / 取消点赞（需要登录）
async function toggleLike(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "post not found", code: "1" });
    }

    const existing = await prisma.like.findUnique({
      where: { postId_userId: { postId, userId } }
    });

    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
    } else {
      await prisma.like.create({ data: { postId, userId } });
    }

    const likeCount = await prisma.like.count({ where: { postId } });
    res.status(200).json({
      code: "0",
      liked: !existing,
      likeCount
    });
  } catch (error) {
    console.error("点赞失败：", error);
    res.status(500).json({ message: "Internal Server Error", code: "3" });
  }
}

export { getFeed, createPost, toggleLike }
