import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongodb();
  const usersList = await Users.find({ role: "Pet Owner" });
  // console.log(usersList.length);
  return NextResponse.json(usersList);
}
