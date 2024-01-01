import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { IoBarChartSharp } from "react-icons/io5";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { RiLineChartLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import MenuLink from "./MenuLink/MenuLink";
import Image from "next/image";
const menu = [
  {
    title: "Pages",
    list: [
      { title: "Dashboard", path: "/Dashboard", icon: <BiSolidDashboard /> },
      { title: "Doctors", path: "/Dashboard/Doctor", icon: <FaUserDoctor /> },
      { title: "Users", path: "/Dashboard/User", icon: <FaUsers /> },
    ],
  },
  {
    title: "Analytics",
    list: [
      { title: "Pie", path: "/Dashboard/Pie", icon: <BiSolidPieChartAlt2 /> },
      { title: "Line", path: "/Dashboard/Line", icon: <RiLineChartLine /> },
      { title: "Bar", path: "/Dashboard/Bar", icon: <IoBarChartSharp /> },
    ],
  },
];
export default function Sidebar() {
  return (
    <div className="h-[97%] w-full sticky top-0 bg-slate-200 flex flex-col items-center justify-evenly p-2 shadow-md rounded-md">
      <div className="flex flex-col items-center justify-center gap-2 fle lg:flex lg:items-center lg:gap-3">
        <Image
          src="/assets/logo.jpg"
          alt="me"
          width="80"
          height="80"
          className="w-12 h-12 rounded-full"
        />
        <h1>PetCare</h1>
      </div>

      <ul className="flex flex-col items-center justify-end gap-5">
        {menu.map((items) => (
          <li className="text-slate-700" key={items.title}>
            <span className="text-sky-500 ">{items.title}</span>
            {items.list.map((items) => (
              <MenuLink item={items} key={items.title} />
            ))}
          </li>
        ))}
      </ul>
      <button className="w-full mt-10 flex items-center justify-center gap-5 text-slate-700 py-1 hover:bg-slate-300 hover:rounded-md">
        <TbLogout /> Log Out
      </button>
    </div>
  ); /*w-16*/
}
