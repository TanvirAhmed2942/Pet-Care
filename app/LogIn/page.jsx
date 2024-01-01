"use client";

import LogInComponent from "@/components/Form/LogIn";
import { usePathname } from "next/navigation";

export default function LogIn() {
  const pathName = usePathname;
  // console.log(pathName().match("LogIn") ? "true" : "false");

  return (
    <LogInComponent purpose={pathName().match("LogIn") ? "login" : null} />
  );
}
