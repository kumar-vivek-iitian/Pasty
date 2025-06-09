"use server"
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function addUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log("EMAIL : ", email)
  if (!email) {
    return { error: true, message: `Error` };
  }
  const findUser = await prisma.users.findUnique({
    where: { email },
  });
  if (findUser) {
    return { error: true, message: "User Already Exists" };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log("New user registered: ", newUser.email)
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
  email = null,
}: {
  title: string;
  language: string;
  theme : string,
  password: string | null;
  code: string;
  timeout : string,
  email?: string | null;
}) {
  if (email) {
    const newPaste = await prisma.paste.create({
      data: {
        title,
        language,
        password,
        timeout,
        theme,
        pasteContent: code,
        email
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

export async function getUser(email: string) {
  const user = await prisma.users.findUnique({ where : { email } } )
  return user
}

export async function getPastes(email: string) {
  const pastes = await prisma.paste.findMany({where: {email}, select : {
    title: true,
    id : true
  }})
  return pastes
}

export async function getPaste(pasteid : string) {
  const paste = await prisma.paste.findUnique({where : {id : pasteid}})
  return paste
}
