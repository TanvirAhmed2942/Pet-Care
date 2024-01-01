"use client";
import { useFormik } from "formik";
import { petOwnerSchema } from "../../app/schema/Schema";
import { useRouter } from "next/navigation";
const initialValuesForPetowner = {
  role: "Pet Owner",
  firstName: "",
  lastName: "",
  phone: "",
  pet: "",
  password: "",
};

export default function SignUpPetOwner(props) {
  const router = useRouter();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValuesForPetowner,
      validationSchema: petOwnerSchema,

      onSubmit: async (values) => {
        const { firstName, lastName, phone, password, role, pet } = values;
        console.log(values);
        if (!values) {
          alert("Fill the form correctly");
          // router.push('/')
        } else {
          try {
            const res = await fetch("http://localhost:3000/api/users/signup", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                firstName,
                lastName,
                phone,
                password,
                role,
              }),
            });

            if (res.ok) {
              alert("Sign Up Success");
              res.json().then(async (resId) => {
                const userId = resId.userId;
                console.log("0000 ", userId);
                try {
                  const res = await fetch(
                    "http://localhost:3000/api/users/postpet",
                    {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({
                        pet,
                        id: userId,
                      }),
                    }
                  );
                  if (res.ok) {
                    router.push("/LogIn");
                  }
                } catch (err) {
                  console.log(err);
                }
              });
            } else {
              throw new Error("Falied to Sign Up");
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    });

  console.log(errors);

  return (
    <div className="w-auto h-screen  flex items-center justify-center ">
      <div className="w-96 h-[70%] lg:[70%] flex items-center justify-center rounded-md bg-slate-600 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="w-11/12 h-[90%] lg:w-9/12 lg:h-[85%] flex flex-col items-center justify-evenly"
        >
          <div
            className={`w-[90%]  my-2 lg:my-1 flex items-center ${
              props.purpose == "login"
                ? "hidden"
                : props.purpose == "signup"
                ? "visible"
                : "hidden"
            }`}
          >
            <h1 className="w-[100%] font-bold text-lg text-white text-center my-2 lg:my-1">
              I am a Pet Owner
            </h1>
          </div>
          <input
            type="text"
            placeholder={
              errors.firstName && touched.firstName
                ? errors.firstName
                : "First Name"
            }
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md focus: outline-none
            ${props.purpose == "login" ? "hidden" : ""}${
              props.purpose == "reset_password" ? "hidden" : ""
            } ${
              errors.firstName && touched.firstName
                ? "placeholder-red-300 border border-red-400"
                : null
            }`}
          />

          <input
            type="text"
            placeholder={
              errors.lastName && touched.lastName
                ? errors.lastName
                : "Last Name"
            }
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md focus: outline-none
            ${
              props.purpose == "login" || props.purpose == "reset_password"
                ? "hidden"
                : "visible"
            }
            ${
              errors.lastName && touched.lastName
                ? "placeholder-red-300 border border-red-400"
                : null
            }`}
          />

          <select
            name="pet"
            value={values.pet}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md
            ${
              errors.pet && touched.pet
                ? " text-red-400 border border-red-400"
                : null
            }focus: outline-none`}
          >
            <option value="Select a Pet">Select a Pet</option>
            <option value="Cat/Dog">Cat/Dog</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
            <option value="Domestic">Domestic</option>
          </select>
          <input
            type="phone"
            placeholder={errors.phone && touched.phone ? errors.phone : "Phone"}
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md ${
              errors.phone && touched.phone
                ? "placeholder-red-300  border-red-400"
                : null
            }focus: outline-none`}
          />
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={
              errors.password && touched.password ? errors.password : "Password"
            }
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md ${
              errors.password && touched.password
                ? "placeholder-red-300 border border-red-400"
                : null
            }focus: outline-none`}
          />

          <button
            type="submit"
            name="submit"
            className="w-[90%] my-2 py-2 rounded-md bg-lime-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
