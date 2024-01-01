import React from "react";
import VetjoinCard from "@/components/VetJoin/VetjoinCard";

export default function page() {
  return (
    <div className="lg:flex flex-wrap w-10/12 h-1/2 mx-auto mt-16 lg:h-screen lg:overflow-x-hidden lg:overflow-y-scroll gap-6 no-scrollbar">
      <VetjoinCard />
    </div>
  );
}
