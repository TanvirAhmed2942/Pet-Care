"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/users/fetch", {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setUsers(data);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  // useEffect(() => {
  //   const fetchPet = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/users/fetchpet",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setPet(data);
  //       console.log(pet);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchPet();
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await fetch(
          "http://localhost:3000/api/users/fetch"
        );
        if (!usersResponse.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        const usersData = await usersResponse.json();
        const petsResponse = await fetch(
          "http://localhost:3000/api/users/fetchpet"
        );

        if (!petsResponse.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        const petsData = await petsResponse.json();
        console.log(usersData, petsData);

        const mergedData = usersData.map((item) => ({
          ...item,
          ...petsData.find((dataItem) => dataItem._id === item._id),
        }));
        console.log("+++", mergedData);
        setUsers(mergedData);
        if (!users) {
          console.log("===");
        } else {
          console.log("-+-", users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user :")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        location.reload();
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(true);
      }
    }
  };
  if (users.length == 0) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <Image
          src="/assets/loading.gif"
          alt="me"
          width={400}
          height={400}
          className="w-20 h-20"
        />
      </div>
    );
  } else {
    return (
      <div className="mt-5  w-full flex items-center justify-center ">
        <table className="lg:w-[95%] lg:h-[95%] border-2 border-sky-500 p-10">
          <thead>
            <tr className="border-b border-b-gray-300">
              <td></td>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Pet</td>
              <td>Role</td>
              <td>Created At</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {users.map((item) => {
              const { _id, firstName, lastName, pet, role, phone, createdAt } =
                item;
              return (
                // alert(JSON.stringify(item));

                // alert(firstName);
                <tr
                  className=" hover:bg-slate-300 border-b border-b-gray-300 text-sm"
                  key={_id}
                >
                  <td>
                    <div>
                      <Image
                        alt="user"
                        src={"/assets/user.png"}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                  </td>

                  <td>{_id}</td>
                  <td>{firstName + " " + lastName}</td>
                  <td>{phone}</td>
                  <td>{pet}</td>
                  <td>{role}</td>
                  <td>
                    {createdAt
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .toString()
                      .replaceAll(",", "-")}
                  </td>
                  <td>
                    <div className="flex gap-4">
                      <Link href={`/Dashboard/User/${_id}`}>
                        <button className="border-2 px-2 rounded-md border-sky-500 hover:bg-sky-500">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          deleteUser(_id);
                        }}
                        // onClick={() => {
                        //   console.log(_id);
                        // }}
                        className="border-2 px-2 rounded-md border-red-500 hover:bg-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {error && (
          <div className="flex flex-col items-center justify-center gap-5 mt-16">
            Doctors List is Empty
            <Image
              src={"/assets/nodatafound.png"}
              alt="doctor"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        )}
      </div>
    );
  }
}
