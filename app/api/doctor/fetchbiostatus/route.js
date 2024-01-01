import { Doctors } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongodb();
  const doctorsList = await Doctors.find({}, { status: 1, bio: 1 });
  if (doctorsList.length > 0) {
    return NextResponse.json(doctorsList);
  } else {
    return NextResponse.json(
      { message: "Doctors List is Empty" },
      { status: 404 }
    );
  }
  // console.log(usersList.length);
}
