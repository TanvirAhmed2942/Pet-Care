"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3001");

export default function Join(props) {
  const router = useRouter();

  const style = {
    enable: "px-3 py-1 rounded bg-green-600",
    disable: "px-3 py-1 rounded shadow bg-sky-500 disabled:opacity-75",
  };

  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const userdata = Cookies.get("userData");
    if (userdata) {
      setUserInfo(userdata);
    }
  }, [userInfo]); // This effect runs only once, similar to componentDidMount
  const handleSendMessage = () => {
    // Emit a message to the server
    socket.emit("userEnd", userInfo);
  };

  socket.on("message", (message) => {
    console.log("Approved message received:", message);
    // Implement approval handling here (e.g., redirect, update state, etc.)
    router.push("/Room");
  });

  return (
    <div className="flex flex-row my-4 mr-14">
      <button
        onClick={handleSendMessage}
        disabled={props.purpose === "Join" ? false : true}
        className={`absolute top-0 ${
          props.purpose === "Join" ? style.enable : style.disable
        }`}
      >
        Join
      </button>
    </div>
  );
}
