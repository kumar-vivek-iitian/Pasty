import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

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
    return { error: false, message: `${newUser} created successfully.` };
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

