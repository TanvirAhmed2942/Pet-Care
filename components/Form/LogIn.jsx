import { useFormik } from "formik";
import Link from "next/link";
import { loginSchema } from "../../app/schema/Schema";
import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const initialValuesLogIn = {
  phone: "",
  password: "",
};

export default function LogInComponent() {
  const router = useRouter();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValuesLogIn,
      validationSchema: loginSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const res = await fetch("http://localhost:3000/api/logIn", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (res.ok) {
            alert("LogIn Success");
            let user = {};
            user = await res.json();

            Cookies.set("userData", JSON.stringify(user), { expires: 7 });
            console.log(user);
            router.push(
              user.role == "Pet Owner"
                ? `/Profile/${user.id}`
                : `/Vet/${user.id}`
            );
          } else {
            alert("LogIn Failed");
            throw new Error("Failed to Log In");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
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
          <h1 className="text-xl font-bold text-white">Log In</h1>
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
            Log In
          </button>
          <div>
            <p className="text-neutral-300">
              <Link href={"/ForgotPassword"}>
                <span className="hover hover:text-sky-500">
                  Forgot Password?
                </span>
              </Link>

              {/* <Link href={"/SignUp"}>
                <span className="ml-2 hover hover:text-sky-500">SignUp</span>
              </Link> */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
