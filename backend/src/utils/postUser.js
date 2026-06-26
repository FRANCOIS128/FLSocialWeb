import prisma from '../lib/prisma.js'

async function postUser(user) {
  try {
    return await prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        displayName: user.displayName,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.log("postUser error: ", error);
    throw error;
  }
}

export {
  postUser
}
