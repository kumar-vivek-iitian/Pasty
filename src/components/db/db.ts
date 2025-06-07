"use server"
import { PrismaClient } from "@/generated/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.SECRET!;

export async function addUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const findUser = await prisma.users.findUnique({
    where: { username },
  });
  if (findUser) {
    return { error: true, message: "User Already Exists" };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    console.log("New user registered: ", newUser.username)
    return { error: false, message: `You are registered!` };
  } catch (err) {
    return { error: true, message: `Error: ${err}` };
  }
}

export async function addPaste({
  title,
  code,
  language,
  theme,
  password,
  timeout,
  username = null,
}: {
  title: string;
  language: string;
  theme : string,
  password: string | null;
  code: string;
  timeout : string,
  username?: string | null;
}) {
  if (username) {
    const newPaste = await prisma.paste.create({
      data: {
        title,
        language,
        password,
        timeout,
        theme,
        pasteContent: code,
        username
      }
    })
    return newPaste.id;
  } else {
    const newPaste = await prisma.paste.create({
      data: {
        title,
        language,
        password,
        timeout,
        theme,
        pasteContent: code,
      }
    })
    return newPaste.id;
  }
}

export async function getUser(username : string) {
  const user = prisma.users.findUnique({ where : { username } } )
  return user
}

async function getCookie(username : string) {
  const cookie = jwt.sign({username}, JWT_SECRET, {algorithm: "HS256", expiresIn: "24hr"})
  return cookie
}

export async function Login(username : string, password : string) {
  const user = await prisma.users.findUnique({where: {username}})
  if (!user) {
    return {error: true, message: "Invalid username or password."}
  } else {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const cookie = await getCookie(username);
      return {error: false, cookie};
    } else {
      return {error: true, message: "Invalid username or password."}
    }
  }
}