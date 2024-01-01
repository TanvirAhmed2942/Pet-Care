import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { firstName, lastName, phone, password, role } = await request.json();
  await connectMongodb();
  const newDocotr = await Users.create({
    firstName,
    lastName,
    phone,
    role,
    password,
  });

  const doctorId = newDocotr._id;
  return NextResponse.json(
    { doctorId, message: "User Created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongodb();
  const usersList = await Users.find();
  console.log(usersList.length);
  return NextResponse.json({ usersList });
}
