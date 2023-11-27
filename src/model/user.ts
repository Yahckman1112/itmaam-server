import mongoose from "mongoose";
import { UserProps } from "../interfaces/interfaces";
import jwt from "jsonwebtoken";
const Joi = require("joi-browser");

const userSchema = new mongoose.Schema<UserProps>({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function (this: UserProps) {
  const token = jwt.sign({ _id: this._id, username: this.userName }, "12345");

  return token;
};

export const User = mongoose.model("User", userSchema);

export const validateUser = (payload: UserProps) => {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};
