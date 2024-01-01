"use client";
import { useState } from "react";
import { HiUserCircle, HiUserAdd } from "react-icons/hi";
import PreReg from "../Modal/PreReg";
import Link from "next/link";
export default function DropDown() {
  const [hover, setHover] = useState(false);
  const [modal, showModal] = useState(false);

  const handleHover = () => {
    setHover(!hover);
  };
  const handleModal = () => {
    showModal(!modal);
  };
  let a = 0;
  return (
    <div className="absolute ml-8">
      <div className="relative ">
        <button
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          className="p-0.5 border-2 rounded curser-pointer border-sky-600"
        >
          User
          {!hover ? (
            <HiUserCircle
              size={20}
              className="ml-1 inline-block h-full align-middle"
            />
          ) : (
            <HiUserAdd
              size={20}
              className="ml-1 inline-block h-full align-middle hover:transition hover:ease-in-out hover:duration-700"
            />
          )}
        </button>
        {hover && (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative absolte w-24 bg-sky-500 rounded-md -ml-3.5"
          >
            <ul className="text-center flex flex-col p-3">
              <Link
                href={"/SignUp/PetOwner"}
                className=" my-1  hover:bg-sky-400 hover:rounded-md cursor-pointer"
              >
                Sign Up
              </Link>
              <Link
                href={"/LogIn"}
                className=" my-1  hover:bg-sky-400 hover:rounded-md cursor-pointer"
              >
                Log In
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
