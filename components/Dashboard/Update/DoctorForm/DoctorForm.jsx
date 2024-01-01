"use client";
import { useFormik } from "formik";
import { dvetSchema } from "@/app/schema/Schema";
import { useRouter } from "next/navigation";

const initialValuesForVet = {
  firstName: "",
  lastName: "",
  bio: "",
  phone: "",
};
export default function DoctorForm({ doctorData, id, bio }) {
  const router = useRouter();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValuesForVet,
    validationSchema: dvetSchema,
    onSubmit: (values) => {
      if (
        values.firstName == "" &&
        values.lastName == "" &&
        values.phone == "" &&
        values.bio == ""
      ) {
        alert("no changes");
      } else {
        console.log(values);
        const updateData = async () => {
          const { firstName, lastName, phone, bio } = values;
          try {
            const res = await fetch(
              `http://localhost:3000/api/users/update/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, phone, bio }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to Update topic");
            } else {
              alert("Information Updated successfully");
              router.push("/Dashboard/Doctor");
            }
          } catch (error) {
            console.log(error);
          }
        };
        updateData();
        //
        const updateBio = async () => {
          const { bio } = values;

          if (!bio == "" || bio.length !== 0) {
            try {
              const res = await fetch(
                `http://localhost:3000/api/doctor/fetchbio/${id}`,
                {
                  method: "PUT",
                  headers: {
                    "Content-type": "application/json",
                  },
                  body: JSON.stringify({ bio }),
                }
              );

              if (!res.ok) {
                throw new Error("Failed to Update Bio");
              } else {
                alert(`Bio : [${bio}] Updated successfully`);

                router.push("/Dashboard/Doctor");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("NO Update Bio");
          }
        };
        updateBio();
        //
      }
    },
  });
  console.log(errors);
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder={doctorData.firstName}
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`rounded-sm placeholder-black ${
                errors.firstName && touched.firstName
                  ? "placeholder-red-300 border border-red-400"
                  : null
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder={doctorData.lastName}
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`rounded-sm placeholder-black${
                errors.lastName && touched.lastName
                  ? "placeholder-red-300 border border-red-400"
                  : null
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Bio</label>
          <input
            type="text"
            name="bio"
            placeholder={bio}
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`rounded-sm placeholder-black${
              errors.bio && touched.bio
                ? "placeholder-red-300 border border-red-400"
                : null
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Phone</label>
          <input
            type="phone"
            placeholder={doctorData.phone}
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`rounded-sm placeholder-black${
              errors.phone && touched.phone
                ? "placeholder-red-300 border border-red-400"
                : null
            }`}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col border-2 border-sky-500 hover:bg-sky-500 rounded-sm">
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="flex flex-col border-2 border-green-500 hover:bg-green-500 rounded-sm">
            <button type="submit" name="submit">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
