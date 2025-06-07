import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/components/db/db";

export async function POST(request: NextRequest) {
  const { username, password }: { username: string; password: string } = await request.json() as {username : string, password : string}
  const response = await addUser({username, password});
  return NextResponse.json(response)
}
