"use client";

import SignUpPetOwner from "@/components/Form/SignUpPetOwner";
import { usePathname } from "next/navigation";
export default function UserSignup() {
  const pathName = usePathname;
  // console.log(pathName().match("SignUp") ? "true" : "false");
  return (
    <div>
      <SignUpPetOwner
        purpose={pathName().match("PetOwner") ? "signup" : null}
      />
    </div>
  );
}
