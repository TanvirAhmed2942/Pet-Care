import * as Yup from "yup";
import "yup-phone-lite";

export const vetSchema = Yup.object({
  role: Yup.string().required("Role"),
  firstName: Yup.string().min(3).max(25).required("Please Enter First Name"),
  lastName: Yup.string().min(3).max(25).required("Please Enter Last Name"),
  bio: Yup.string().min(3).max(15).required("Please Enter Your Bio (3-5 char)"),
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    )
    .required("Phone Number required"),

  password: Yup.string().min(6).required("Please Enter Password (min 6)"),
});

export const petOwnerSchema = Yup.object({
  role: Yup.string().default("Patient"),
  firstName: Yup.string().min(3).max(25).required("Please Enter First Name"),
  lastName: Yup.string().min(3).max(25).required("Please Enter Last Name"),
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    )
    .required("Phone Number required"),
  pet: Yup.string()
    .notOneOf(["Select a Pet"], "Selecfdfdf")
    .required("Please Select a Pet"),
  password: Yup.string().min(6).required("Please Enter Password (min 6)"),
});
// required("Please Select a Pet")
export const loginSchema = Yup.object({
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    )
    .required("Phone Number required"),
  password: Yup.string()
    .min(6)
    .required("Please Enter Your Password (min 6 characters)"),
});

export const resetSchema = Yup.object({
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    )
    .required("Phone Number required"),
  otp: Yup.string().required(),

  password: Yup.string()
    .min(6)
    .required("Please Enter Your Password (min 6 characters)"),
});
//////////

export const duserSchema = Yup.object({
  firstName: Yup.string().min(3).max(25),
  lastName: Yup.string().min(3).max(25),
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    ),
  pet: Yup.string(),
});

export const dvetSchema = Yup.object({
  firstName: Yup.string().min(3).max(25),
  lastName: Yup.string().min(3).max(25),
  bio: Yup.string().min(3).max(15),
  phone: Yup.string()
    .phone("BD", true, "invalid")
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Required a valid Bangladeshi number"
    ),
});
