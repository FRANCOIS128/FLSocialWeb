import bcrypt from "bcryptjs";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

async function encryption(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.log("密码加密失败: ", error);
    throw new Error(`密码加密失败: ${error}`);
  }
}

export {
  encryption
}
