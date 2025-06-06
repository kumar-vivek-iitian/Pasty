import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { addPaste } from "@/components/db/db";

const SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      code,
      language,
      theme,
      password,
    }: {
      title: string;
      code: string;
      language: string;
      theme: string;
      password: string;
    } = body;
    let { timeout }: { timeout: string } = body;
    console.log(title, code, language, theme, timeout, password);
    const cookie = request.cookies.get("token");
    const token = cookie?.value;
    if (token) {
      let username = "";
      try {
        const decoded = jwt.verify(token, SECRET);
        if (
          typeof decoded === "object" &&
          decoded !== null &&
          "username" in decoded
        ) {
          username = decoded.username;
        }
      } catch (err) {
        console.log("Token invalid or expired.");
        console.log(err);
        timeout = "15mins";
      }
      const pasteid = await addPaste({
        title,
        code,
        language,
        theme,
        password,
        timeout,
        username,
      });
      return NextResponse.json({ error: false, pasteid: pasteid });
    } else {
      timeout = "15mins";
      const pasteid = await addPaste({
        title,
        language,
        theme,
        password,
        code,
        timeout,
      });
      return NextResponse.json({ error: false, pasteid: pasteid });
    }
  } catch (err: unknown) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to process paste" },
      { status: 400 }
    );
  }
}
