import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, code, language, theme, timeout, password } = body;
    console.log(title, code, language, theme, timeout, password);
    return NextResponse.json(
      { message: "Paste saved succesfully." },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to process paste" },
      { status: 400 }
    );
  }
}
