import { PetOwners } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  // console.log("id=", id);

  try {
    await connectMongodb();
    const user = await PetOwners.findOne({ _id: id }, { pet: 1 });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
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
  const { pet } = await request.json();
  console.log("--------", pet);

  try {
    await connectMongodb();
    const user = await PetOwners.findOne({ _id: id });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the pet information

    await PetOwners.updateOne(
      { _id: id },
      {
        pet: pet,
      }
    );

    return NextResponse.json(
      { message: "Pet information updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating pet information:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
