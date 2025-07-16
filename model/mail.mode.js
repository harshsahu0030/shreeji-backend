import mongoose, { Schema, model } from "mongoose";
import validator from "validator";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },

    contact: {
      type: String,
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Mail = mongoose.models.Mail || model("Mail", schema);
