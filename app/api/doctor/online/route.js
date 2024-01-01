import { Doctors, Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongodb();
  try {
    const doctorsList = await Doctors.find({}, { status: 1, bio: 1, _id: 1 });

    if (doctorsList.length > 0) {
      const activeDoctors = doctorsList.filter(
        (doctor) => doctor.status === true
      );

      if (activeDoctors.length > 0) {
        return NextResponse.json(activeDoctors);
      } else {
        return NextResponse.json(
          { message: "No active doctors found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Doctors List is Empty" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.error({ message: error.message }, { status: 500 });
  }
}
