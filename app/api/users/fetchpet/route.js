import { PetOwners } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongodb();
  const usersList = await PetOwners.find({}, { pet: 1 });
  if (usersList.length > 0) {
    return NextResponse.json(usersList);
  } else {
    return NextResponse.json(
      { message: "Users List is Empty" },
      { status: 404 }
    );
  }
  console.log(usersList.length);
}
