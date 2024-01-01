"use client";
import DoctorForm from "@/components/Dashboard/Update/DoctorForm/DoctorForm";
import { useState, useEffect } from "react";

export default function UpdateDoctor({ params }) {
  const { id } = params;

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/update/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await res.json();
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const [bio, setBio] = useState();
  useEffect(() => {
    const fetchBio = async (id) => {
      try {
        if (!id) return;
        // console.log("inhhf", id);
        const response = await fetch(
          `http://localhost:3000/api/doctor/fetchbio/${id}`,
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
        const docbio = await response.json();

        setBio(docbio);
        console.log("Bio :", bio.bio);
      } catch (error) {
        console.error("Error fetching Bio:", error);
      }
    };
    fetchBio(id);
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>; // Return loading state until data is fetched
  }

  return (
    <div className="h-[85%] flex items-center justify-center bg-slate-200 shadow-md rounded-md">
      <DoctorForm doctorData={userData} id={id} bio={bio.bio} />
    </div>
  );
}
