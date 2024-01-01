import { Users } from "@/libs/models";
import connectMongodb from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { phone, password } = await request.json();
  await connectMongodb();

  const user = await Users.findOne(
    { phone: phone, password: password },
    { role: 1, _id: 1, firstName: 1, lastName: 1, phone: 1 }
  );

  if (user) {
    const { role, id, firstName, lastName, phone } = user;

    return NextResponse.json(
      { role, id, firstName, lastName, phone },
      { status: 200 }
    );
  } else {
    return NextResponse.json({ message: "User not matches" }, { status: 401 });
  }
}

// export async function GET(request, { params }) {
//   const { phone } = params;
//   console.log("-", phone);
//   await connectMongodb();
//   const user = await Users.findOne({ phone: phone }, { role: 1, _id: 1 });
//   if (user) {
//     return NextResponse.json(
//       { message: `User matches: ${user}` },
//       { status: 200 }
//     );
//   } else {
//     return NextResponse.json({ message: "User not matches" }, { status: 401 });
//   }
// }
