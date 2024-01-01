"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

export default function DoctorTable() {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(false);
  // const [biostatus, setBiostatus] = useState([]);
  // const [combine, setCombine] = useState([]);
  // useEffect(() => {
  //   const fetchDoctors = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/doctor/fetch", {
  //         method: "GET",
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       });
  //       if (!response.ok) {
  //         setError(true);
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setDoctors(data);
  //       // console.log(doctors);
  //     } catch (error) {
  //       console.error("Error fetching Doctors:", error);
  //     }
  //   };
  //   fetchDoctors();
  // }, []);

  // useEffect(() => {
  //   const fetchBioStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/doctor/fetchbiostatus",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         setError(true);
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setBiostatus(data);
  //     } catch (error) {
  //       console.error("Error fetching Bio Status:", error);
  //     }
  //   };
  //   fetchBioStatus();
  // }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
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
          "http://localhost:3000/api/doctor/fetchbiostatus"
        );
        if (!biostatusResponse.ok) {
          setError(true);
          throw new Error("Network response was not ok");
        }
        const biostatusData = await biostatusResponse.json();
        // console.log(biostatusData);
        // Match doctors with their biostatus based on ID
        // const doctorsWithBiostatus = doctorsData.map((doctor) => {
        //   const matchingBioStatus = biostatusData.find(
        //     (status) => status.doctorId === doctor._id
        //   );
        //   return {
        //     ...doctor,
        //     biostatus: matchingBioStatus, // Add biostatus to each doctor object
        //   };
        // });
        const mergedData = doctorsData.map((item) => ({
          ...item,
          ...biostatusData.find((elem) => elem._id === item._id),
        }));

        setDoctors(mergedData);
        console.log("----", doctors);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };

    fetchDoctors();
  }, []);

  const deleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user :")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/doctor/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          alert("Data Deleted successfully");
          location.reload();
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };
  if (doctors.length == 0) {
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
      <div className="mt-5  w-full flex flex-col items-center justify-center ">
        <table className="lg:w-[95%] lg:h-[95%] border-2 border-sky-500 p-10">
          <thead>
            <tr className="border-b border-b-gray-300">
              <td></td>
              <td>ID</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Bio</td>

              <td>Role</td>
              <td>Status</td>
              <td>Created At</td>
              <td>Action</td>
            </tr>
          </thead>

          <tbody>
            {doctors.map((item) => {
              const {
                _id,
                firstName,
                lastName,
                role,
                bio,
                status,
                phone,
                createdAt,
              } = item;
              // const { bio,status } = biostatus;
              return (
                <tr
                  className=" hover:bg-slate-300 border-b border-b-gray-300 text-sm"
                  key={_id}
                >
                  <td>
                    <div>
                      <Image
                        src={"/assets/dashdoctor.png"}
                        alt="doctor"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </div>
                  </td>

                  <td>{_id}</td>
                  <td>{firstName + " " + lastName}</td>
                  <td>{phone}</td>
                  <td>{bio}</td>
                  <td>{role}</td>

                  <td>
                    <span
                      className={`${
                        status
                          ? "px-1 bg-green-500 rounded"
                          : "px-1 bg-red-500 rounded"
                      }`}
                    >
                      {status ? "Active" : "Inactive"}
                    </span>
                  </td>
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
                      <Link href={`/Dashboard/Doctor/${_id}`}>
                        <button className="border-2 px-2 rounded-md border-sky-500 hover:bg-sky-500">
                          Edit
                        </button>
                      </Link>

                      <button
                        onClick={() => {
                          deleteUser(_id);
                        }}
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
