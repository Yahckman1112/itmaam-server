import mongoose from "mongoose";
import { ApplicantsProps } from "../interfaces/interfaces";
const Joi = require("joi-browser");

const applicantsSchema = new mongoose.Schema<ApplicantsProps>({
  pronoun:{type:String},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
});

export const Applicant = mongoose.model("Applicant", applicantsSchema);

export const validateApplicants = (applicants: ApplicantsProps) => {
  const schema = Joi.object({
    pronoun: Joi.string(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.number().required(),
  });

  return schema.validate(applicants);
};
