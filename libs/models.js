import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      max: 25,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      max: 25,
      required: true,
    },

    phone: {
      type: String,
      min: 11,
      required: true,
      undefined: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const vetSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
    },
    bio: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    earnings: {
      type: Number,
      min: 0,
    },
    served: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const petSchema = new mongoose.Schema(
  {
    userId: {
      type: "string",
    },
    pet: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);
export const Doctors =
  mongoose.models.Doctors || mongoose.model("Doctors", vetSchema);
export const PetOwners =
  mongoose.models.PetOwners || mongoose.model("PetOwners", petSchema);
