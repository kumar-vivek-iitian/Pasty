"use server"
import { NextResponse } from "next/server";
import { getPastes } from "@/components/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET() {
  const token = await getServerSession(authOptions)
  if (!token) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  const pastes = await getPastes(token.user.email);
  return NextResponse.json(pastes)
}