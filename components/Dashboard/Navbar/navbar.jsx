"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="h-[12%] bg-slate-200 shadow-md rounded-md flex items-center justify-center">
      <div>{pathname.split("/").pop()}</div>
    </div>
  );
}
