"use client";
import Link from "next/link";
import Logo from "./Logo";
import { TiThMenu } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import DropDown from "../DropDown/DropDown";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDashBoard = pathname.includes("Dashboard");
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav
      className={`fixed w-full h-16 ${
        isDashBoard
          ? "hide"
          : pathname.length == 1
          ? "bg-transparent top-6"
          : "bg-slate-800 top-0"
      } text-white }`}
    >
      <div
        className={`flex items-center justify-between w-full h-full px-4 lg:px-8`}
      >
        <Link href={"/Admin"}>
          <div className="flex items-center cursor-pointer">
            <Logo />
            <h1 className="text-2xl font-extrabold ml-4">Petcare</h1>
          </div>
        </Link>

        <div>
          <ul className="hidden md:flex lg:flex">
            <Link href={"/Vet/12"}>
              <li className="ml-8 hover:border-b text-md p-0.5">Home</li>
            </Link>
            <Link href={"/VetJoin"}>
              <li className="ml-8 hover:border-b text-md p-0.5">Services</li>
            </Link>
            <Link href={"/SignUp/Doctor"}>
              <li className="ml-8 hover:bg-sky-500 text-md border-2 rounded border-sky-500 p-0.5">
                Sign Up
              </li>
            </Link>
            <Link href={"/LogIn"}>
              <li className="ml-8 hover:bg-emerald-500 text-md border-2 rounded border-emerald-500 p-0.5">
                Log In
              </li>
            </Link>
            <div className="relative w-28 ">
              <DropDown />
            </div>
          </ul>
        </div>
        <div
          onClick={handleNav}
          className="md:hidden cursor-pointer pl-24 inline"
        >
          <TiThMenu size={24} />
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 w-[70%] p-10  h-screen bg-slate-800  ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 h-screen ease-in duration-500"
        }
      >
        <div className="flex items-center justify-end w-full">
          <div onClick={handleNav} className="font-bold cursor-pointer">
            <IoClose size={30} />
          </div>
        </div>
        <div className=" z-10 felx-col h-full py-14 text-white">
          <ul>
            <Link href={"/VetJoin"}>
              <li onClick={handleNav} className="m-4 cursor-pointer">
                Home
              </li>
            </Link>
            <Link href={"/VetJoin"}>
              <li onClick={handleNav} className="m-4 cursor-pointer">
                Services
              </li>
            </Link>
            <Link href={"#"}>
              <li
                onClick={handleNav}
                className="m-4 inline p-0.5 cursor-pointer border-2 rounded border-sky-500"
              >
                Sign Up
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}
