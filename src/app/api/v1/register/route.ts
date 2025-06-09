import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/components/db/db";

export async function POST(request: NextRequest) {
  const { email, password }: { email: string; password: string } = await request.json() as {email : string, password : string}
  const response = await addUser({email, password});
  return NextResponse.json(response)
}
