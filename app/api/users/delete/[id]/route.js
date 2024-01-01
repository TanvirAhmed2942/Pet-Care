import { Users, PetOwners } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    console.log("Deleting user with ID:", id);

    await connectMongodb();

    // Delete the user by ID
    await Users.findByIdAndDelete({ _id: id });
    await PetOwners.findByIdAndDelete({ _id: id });

    return NextResponse.json({ message: "User data deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}
