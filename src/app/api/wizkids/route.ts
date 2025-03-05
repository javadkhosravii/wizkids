import { wizkids } from "@/data/wizkids";
// import { type NextRequest } from "next/server";

export const dynamic = "auto";


export function GET() {
  return Response.json({ wizkids });
}
