import Card from "@/components/Dashboard/Card/Card";

import React from "react";

export default function Dashboard() {
  return (
    <div className="h-[85%] bg-slate-200 shadow-md rounded-md flex">
      <div className="mt-5 flex flex-col items-center justify-evenly flex-grow lg:flex-row lg:items-start lg:flex-grow">
        <Card show="Doctor" />
        <Card show="User" />
        <Card show="Profit" />
      </div>
    </div>
  );
}
