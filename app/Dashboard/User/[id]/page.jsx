"use client";
import UserForm from "@/components/Dashboard/Update/UserForm/UserForm";
// import MyForm from "@/components/Dashboard/Update/dami";
import { useState, useEffect } from "react";

// export default async function UpdatePetOwner({ params }) {
//   const getOwnerbyId = async (id) => {
//     try {
//       console.log("ppppp");
//       const res = await fetch(`http://localhost:3000/api/users/update${id}`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       return res.json();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const { id } = params;
//   console.log(await getOwnerbyId(id));
//   const { firstName, lastName, phone, role, createdAt } = await getOwnerbyId(
//     id
//   );

//   return (
//     <div className="h-[85%] flex items-center justify-center bg-slate-200 shadow-md rounded-md">
//       <UserForm id={id} />
//     </div>
//   );
// }

export default function UpdatePetOwner({ params }) {
  const { id } = params;

  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/update/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await res.json();
        setUserData(userData); // Set user data in state
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
        // console.log("pet", pet);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPet(id);
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>; // Return loading state until data is fetched
  }

  // Now you can use userData in your component
  return (
    <div className="h-[85%] flex items-center justify-center bg-slate-200 shadow-md rounded-md">
      <UserForm userData={userData} id={id} petType={pet} />
    </div>
  );
}
