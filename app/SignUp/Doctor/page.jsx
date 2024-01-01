"use client";

import SignUpComponent from "@/components/Form/SignUpDoctor";
import { usePathname } from "next/navigation";
export default function UserSignup() {
  const pathName = usePathname;
  // console.log(pathName().match("SignUp") ? "true" : "false");
  return (
    <div>
      <SignUpComponent purpose={pathName().match("Doctor") ? "signup" : null} />
    </div>
  );
}
