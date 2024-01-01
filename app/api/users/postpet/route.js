import { PetOwners } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { pet, id } = await request.json();
  await connectMongodb();
  await PetOwners.create({
    _id: id,
    pet,
  });
  return NextResponse.json({ message: "PetOwner Created" }, { status: 201 });
}
