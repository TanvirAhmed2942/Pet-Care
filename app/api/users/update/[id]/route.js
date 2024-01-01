import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const formdata = await request.json();
  const thingToUpdate = Object.entries(formdata)
    .filter(([key, value]) => value !== "")
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});

  console.log("Keys with values:", thingToUpdate);
  const keys = Object.keys(thingToUpdate);
  const values = Object.values(thingToUpdate);
  console.log(keys, values);
  await connectMongodb();
  // for (const key of thingToUpdate) {
  await Users.updateOne(
    { _id: id },
    {
      firstName: thingToUpdate.firstName,
      lastName: thingToUpdate.lastName,
      phone: thingToUpdate.phone,
    }
  );
  // }
  // await Users.findByIdAndUpdate(id, {
  //   // firstName: firstName,
  //   // lastName: lastName,
  //   // phone: phone,
  // });
  return NextResponse.json("message: User Data Updated", { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  console.log("id", id);
  await connectMongodb();
  return NextResponse.json(await Users.findOne({ _id: id }), { status: 200 });
}
