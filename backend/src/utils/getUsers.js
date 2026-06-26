import prisma from "../lib/prisma.js";

// 对外返回用户时统一剔除 password 字段
const publicUserSelect = {
  id: true,
  username: true,
  displayName: true,
  avatar: true,
  bio: true,
  createdAt: true
};

async function findUserByName(username) {
  try {
    return await prisma.user.findUnique({
      where: { username }
    });
  } catch (error) {
    console.log("findUserByName error: ", error);
    throw error;
  }
}

async function findPublicUserById(id) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: publicUserSelect
    });
  } catch (error) {
    console.log("findPublicUserById error: ", error);
    throw error;
  }
}

export {
  findUserByName,
  findPublicUserById,
  publicUserSelect
}
