import { Doctors } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { bio, id } = await request.json();
  console.log("------", id);
  await connectMongodb();
  await Doctors.create({
    _id: id,
    bio,
  });
  return NextResponse.json({ message: "Vet Doctor Created" }, { status: 201 });
}
