"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Status() {
  const [status, setStatus] = useState(true);

  const id = usePathname().split("/").pop();

  const updateStatus = async (newStatus, id) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/doctor/putstatus/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to Update Info");
      } else {
        const statusNow = await res.json(); // Use 'res' instead of 'response'
        console.log("Response from API:", statusNow);

        alert(
          `Status ${status ? "[Offline]" : "[Online]"} Updated successfully`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    updateStatus(newStatus, id);
  };

  return (
    <div>
      <h1
        className="h-8 mt-6  py-1 px-2 rounded-md text-center bg-slate-400 cursor-pointer"
        // onLoad={whatstatusNow}
        onClick={handleStatusToggle}
      >
        Status{" "}
        {status && <span className=" bg-lime-500 rounded-md p-0.5">On</span>}
        {!status && <span className=" bg-rose-500 rounded-md p-0.5">Off</span>}
      </h1>
    </div>
  );
}
