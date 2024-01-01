"use client";
import Image from "next/image";
import { Avatar } from "@/components/Avatar/Avatar";
import Button from "@/components/Button/ButtonTwo";
import Join from "@/components/Button/Join";
import Bio from "@/components/UserProfile/Bio";
import { useState, useEffect } from "react";

export default function VetjoinCard() {
  const [online, setOnline] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchDoctorsOnline = async () => {
      try {
        const doctorsResponse = await fetch(
          "http://localhost:3000/api/doctor/fetch"
        );
        if (!doctorsResponse.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        const doctorsData = await doctorsResponse.json();
        // console.log(doctorsData);
        const biostatusResponse = await fetch(
          "http://localhost:3000/api/doctor/online"
        );
        if (!biostatusResponse.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        const biostatusData = await biostatusResponse.json();

        console.log(biostatusData);
        const mergedData = doctorsData.map((item) => ({
          firstName: item.firstName,
          lastName: item.lastName,
          ...biostatusData.find((elem) => elem._id === item._id),
        }));
        const doconline = mergedData.filter((elem) => elem.status === true);

        setOnline(doconline);
        console.log("----", online);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };
    fetchDoctorsOnline();
  }, []);
  const time = 0;

  if (online.length == 0) {
    return (
      <div className="h-screen w-[100%] flex flex-col items-center justify-center gap-4 ">
        <h1 className="text-xl font-bold">Getting Best Doctors for You</h1>
        <Image
          src="/assets/manyperson.gif"
          alt="me"
          width={400}
          height={400}
          className="w-52 h-44"
        />
      </div>
    );
  } else {
    return (
      <>
        {online.map((item) => {
          return (
            <div
              key={item._id}
              className="flex items-center justify-center gap-2 shadow-lg h-36 mx-auto rounded-md sm:w-5/6 sm:gap-7 p-4 my-4 md:mt-8 md:h-48 lg:h-80 lg:w-60 lg:flex-col lg:items-center lg:justify-center lg:rounded-xl bg-slate-100"
            >
              <Avatar size={80} />
              <div className="flex-col items-end justify-center p-4 lg:ml-4 lg:p-0">
                <div className="md:w-56">
                  <Bio
                    name={`${item.firstName} ${item.lastName}`}
                    bio={item.bio}
                  />
                </div>
                <div className="relative flex flex-row items-center justify-start sm:gap-4 md:mt-4 lg:justify-end lg:mr-1">
                  <Button time={`${time}m`} />
                  <Join purpose={`${time == 0 ? "Join" : "Not"}`} />
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
