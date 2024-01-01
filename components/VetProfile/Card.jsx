"use client";
import { Avatar } from "../Avatar/Avatar";
import Badge from "../UserProfile/Badge";
import Bio from "../UserProfile/Bio";
import Utlity from "./Utility";
import Status from "./VetStatus";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

export default function VetProfile({ profile, bio }) {
  const [incoming, setIncoming] = useState("");
  const [owner, setOwner] = useState();
  const [doctor, setDoctor] = useState();
  const router = useRouter();
  const served = 13;
  const earnings = 50;
  // const incoming = true;
  useEffect(() => {
    // Listen for the "serverEnd" event from the Socket.IO server
    socket.on("serverEnd", (message) => {
      setOwner(message);
      setIncoming(true);
    });
  }, []);

  console.log(owner);
  const handleApprove = () => {
    socket.emit("approved", true);
    const ownerId = JSON.parse(owner);
    const doctorId = JSON.parse(doctor);
    console.log(ownerId.id, doctorId.id);
    router.push(`/Room?po=${ownerId.id}+vd=${doctorId.id}`);
  };

  useEffect(() => {
    const userdata = Cookies.get("userData");
    if (userdata) {
      setDoctor(userdata);
    }
  }, [doctor]);
  console.log(doctor);

  return (
    <div className="lg:w-auto lg:h-screen flex items-start justify-center mt-28 lg:mt-28">
      <div className="flex flex-col p-4 items-center justify-center">
        <div className=" lg:w-[27vw] lg:h-[60vh] rounded-md shadow-md flex flex-col gap-6 lg:p-2 items-center justify-center">
          <Avatar size={80} />
          <div className="flex flex-col gap-3 items-center ">
            <Bio name={profile.firstName + " " + profile.lastName} bio={bio} />
            <div className="flex items-center gap-x-3 justify-center">
              <Utlity purpose="Served" count={served} />

              <Image
                onClick={handleApprove}
                src="/assets/calling.gif"
                alt="calling"
                width={60}
                height={60}
                className={`w-14 h-14 border-2 rounded-full ${
                  incoming ? "visible" : "hidden"
                }`}
              />

              <Utlity purpose="Earnings" count={earnings} />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center justify-evenly ">
          <Status />
          <Badge type="Change Password" />
          <Badge type="Log Out" />
        </div>
      </div>
    </div>
  );
}
//////////
