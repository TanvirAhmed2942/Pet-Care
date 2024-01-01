"use client";
import VetProfile from "@/components/VetProfile/Card";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function vetProfile() {
  const [id, setID] = useState();
  const urlID = usePathname().split("/").pop();

  useEffect(() => {
    setID(urlID);
  }, [urlID]);

  const [doctor, setDoctor] = useState([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchDoctor = async (id) => {
      try {
        if (!id) return;
        // console.log("inhhf", id);
        const response = await fetch(
          `http://localhost:3000/api/users/profilebio/${id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDoctor(id);
  }, [id]);

  useEffect(() => {
    const fetchDoctor = async (id) => {
      try {
        if (!id) return;
        // console.log("inhhf", id);
        const response = await fetch(
          `http://localhost:3000/api/doctor/profile/${id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBio(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchDoctor(id);
  }, [id]);

  console.log(doctor);
  console.log(bio);
  if (doctor.length == 0) {
  } else {
    return <VetProfile profile={doctor} bio={bio.bio} />;
  }
}
