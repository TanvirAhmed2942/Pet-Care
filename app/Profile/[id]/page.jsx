"use client";

import { useState, useEffect } from "react";
import ProfileCard from "@/components/UserProfile/ProfileCard";
import { usePathname } from "next/navigation";

export default function Page() {
  const [id, setID] = useState();
  const urlID = usePathname().split("/").pop();

  useEffect(() => {
    setID(urlID);
  }, [urlID]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async (id) => {
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
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers(id);
  }, [id]);
  const [pet, setPet] = useState();
  useEffect(() => {
    const fetchPet = async (id) => {
      try {
        if (!id) return;
        // console.log("inhhf", id);
        const response = await fetch(
          `http://localhost:3000/api/users/pet/${id}`,
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
        const petdata = await response.json();

        setPet(petdata.pet);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPet(id);
  }, [id]);

  return (
    <>
      <ProfileCard users={users} pet={pet} />;
    </>
  );
}
