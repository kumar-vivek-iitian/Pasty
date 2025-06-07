import { Login } from "@/components/db/db";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const {username, password} : {username : string, password : string} = await request.json();
  const response = await Login(username, password);
  if (response.error) {
    return NextResponse.json(response, {status: 401})
  } else {
    const cookieStore = await cookies();
    cookieStore.set('token', response.cookie!, {
      httpOnly: true,
      path: "/api/v1",
      maxAge: 60 * 60 * 24
    });
    return NextResponse.json({error : false, message: "Login Successful"})
  }
}