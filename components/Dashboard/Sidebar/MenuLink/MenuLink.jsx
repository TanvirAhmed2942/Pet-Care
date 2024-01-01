"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function MenuLink({ item }) {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <Link
      href={item.path}
      className={`flex items-center justify-start gap-4 px-3 py-1 hover:bg-slate-300 hover:rounded-md ${
        pathname === item.path ? "active: bg-slate-300 rounded-md" : ""
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
}
