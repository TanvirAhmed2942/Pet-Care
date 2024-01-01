"use client";

import { useFormik } from "formik";
import { duserSchema } from "@/app/schema/Schema";
import { useRouter } from "next/navigation";

const initialValuesForUser = {
  firstName: "",
  lastName: "",
  phone: "",
  pet: "",
};

export default function UserForm({ userData, id, petType }) {
  const router = useRouter();
  const {
    values,
    errors,

    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = useFormik({
    initialValues: initialValuesForUser,
    validationSchema: duserSchema,

    onSubmit: (values) => {
      if (
        values.firstName == "" &&
        values.lastName == "" &&
        values.phone == ""
      ) {
        alert("no changes");
      } else {
        console.log(values);

        const updateData = async () => {
          const { firstName, lastName, phone } = values;
          try {
            const res = await fetch(
              `http://localhost:3000/api/users/update/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, phone }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to Update Info");
            } else {
              alert("Information Updated successfully");

              router.push("/Dashboard/User");
            }
          } catch (error) {
            console.log(error);
          }
        };
        updateData();
      }
      //
      const updatePet = async () => {
        const { pet } = values;

        if (pet !== petType || pet === null) {
          try {
            const res = await fetch(
              `http://localhost:3000/api/users/pet/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({ pet }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to Update Pet");
            } else {
              alert(`Pet : [${pet}] Updated successfully`);

              router.push("/Dashboard/User");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert("NO Update Pet");
        }
      };
      updatePet();

      //
    },
  });
  console.log(errors);

  return (
    <div className="border-2 border-slate-500 p-6 rounded-sm">
      <form
        onSubmit={handleSubmit}
        // onReset={resetForm}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label htmlFor="">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder={userData.firstName}
              value={values.firstName}
              // onChange={(e) => setInfo(e.target.value)}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`rounded-sm placeholder-black${
                errors.firstName
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
              placeholder={userData.lastName}
              value={values.lastName}
              onChange={handleChange}
              // onChange={(e) => setInfo(e.target.value)}
              onBlur={handleBlur}
              className={`rounded-sm placeholder-black${
                errors.lastName
                  ? "placeholder-red-300 border border-red-400"
                  : null
              }`}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <select
            name="pet"
            value={values.pet}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`rounded-sm placeholder-black${
              errors.pet ? "placeholder-red-300 border border-red-400" : null
            }`}
          >
            <option value={`${petType}`} selected>{`${petType}`}</option>
            <option value="Cat/Dog">Cat/Dog</option>
            <option value="Fish">Fish</option>
            <option value="Domestic">Domestic</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Phone</label>
          <input
            type="phone"
            name="phone"
            placeholder={userData.phone}
            value={values.phone}
            onChange={handleChange}
            // onChange={(e) => setInfo(e.target.value)}
            onBlur={handleBlur}
            className={`rounded-sm placeholder-black${
              errors.phone ? "placeholder-red-300 border border-red-400" : null
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
