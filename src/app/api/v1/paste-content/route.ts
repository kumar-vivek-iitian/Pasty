"use server"
import { NextRequest, NextResponse } from "next/server";
import { addPaste } from "@/components/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


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
    const session = await getServerSession(authOptions)
    if (session) {
      const email = session.user.email;
      const pasteid = await addPaste({
        title,
        code,
        language,
        theme,
        password,
        timeout,
        email,
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
