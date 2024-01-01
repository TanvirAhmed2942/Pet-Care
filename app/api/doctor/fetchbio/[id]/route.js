//Update also//

import { Doctors } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  //   console.log("id=", id);

  try {
    await connectMongodb();
    const bio = await Doctors.findOne({ _id: id }, { bio: 1 });

    if (!bio) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(bio, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  console.log("id=", id);
  const { bio } = await request.json();

  try {
    await connectMongodb();
    await Doctors.findOneAndUpdate({ _id: id }, { bio: bio });

    return NextResponse.json(
      { message: "Bio Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Updating Bio:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
