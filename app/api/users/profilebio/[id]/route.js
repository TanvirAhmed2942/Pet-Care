import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  console.log("id=", id);

  try {
    await connectMongodb();
    const user = await Users.findOne(
      { _id: id },
      { firstName: 1, lastName: 1, createdAt: 1 }
    );

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
