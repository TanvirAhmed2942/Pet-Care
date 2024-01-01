import Navbar from "@/components/Dashboard/Navbar/navbar";
import Sidebar from "@/components/Dashboard/Sidebar/sidebar";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="h-screen bg-slate-300 flex items-center justify-around">
      <div className="h-screen w-[18%] flex items-center justify-center">
        <Sidebar />
      </div>
      <div className="h-screen w-[80%] flex flex-col  justify-between p-2">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
