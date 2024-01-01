import { Doctors } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    await connectMongodb();
    await Doctors.updateOne({ _id: id }, { status: status });

    // Fetch updated status after the update
    const updatedDoctor = await Doctors.findOne({ _id: id });
    const updatedStatus = updatedDoctor ? updatedDoctor.status : null;

    return NextResponse.json({ status: updatedStatus }, { status: 200 });
  } catch (error) {
    console.error("Error updating status:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
export async function GET(request, { params }) {
  try {
    const { id } = params;

    await connectMongodb();
    const doctor = await Doctors.findOne({ _id: id });
    const statusIs = doctor ? doctor.status : null;

    return NextResponse.json({ status: statusIs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching status:", error);
    return NextResponse.error(error.message, { status: 500 });
  }
}
