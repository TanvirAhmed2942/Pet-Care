"use client";
import { useFormik } from "formik";
import { vetSchema } from "../../app/schema/Schema";
import { useRouter } from "next/navigation";
const initialValuesForVet = {
  role: "Vet Doctor",
  firstName: "",
  lastName: "",
  bio: "",
  phone: "",
  password: "",
};

export default function SignUpComponent(props) {
  const router = useRouter();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValuesForVet,
      validationSchema: vetSchema,

      onSubmit: async (values) => {
        const { firstName, lastName, bio, phone, password, role } = values;
        console.log(values);
        if (!values) {
          alert("Fill the form correctly");
          // router.push('/')
        } else {
          try {
            const res = await fetch("http://localhost:3000/api/doctor/signup", {
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
                const doctorId = resId.doctorId;
                console.log(doctorId);
                try {
                  const res = await fetch(
                    "http://localhost:3000/api/doctor/postbio",
                    {
                      method: "POST",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify({
                        bio,
                        id: doctorId,
                      }),
                    }
                  );
                  if (res.ok) {
                    router.push("/LogIn");
                  }
                } catch (err) {}
              });

              // router.refresh()
              router.push("/LogIn");
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
          <div>
            <h1 className="w-[100%] font-bold text-lg text-center text-white my-2 lg:my-1">
              I am a Doctor
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

            `}
          />
          <input
            type="text"
            placeholder={
              errors.bio && touched.bio ? errors.bio : "Bio: Exp- 6yrs"
            }
            name="bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-[90%] lg:my-1 pl-2 py-3 lg:py-2 rounded-md 
            
            ${
              errors.bio && touched.bio
                ? "placeholder-red-300 border border-red-400"
                : null
            }
             focus: outline-none`}
          />
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
