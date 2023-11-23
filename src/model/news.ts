import mongoose from "mongoose";
const Joi = require("Joi-browser");
import { NewsProps } from "../interfaces/interfaces";

const newSchema = new mongoose.Schema<NewsProps>({
  headLine: { type: String, required: true },
  writer: { type: String, required: true },
  Date: { type: Date, default: Date.now },
  news: { type: String, required: true },
});

export const New = mongoose.model("New", newSchema);

export const validate = (news: NewsProps) => {
  const schema = Joi.object({
    headLine: Joi.string().required(),
    writer: Joi.string().required(),
    news: Joi.string().required(),
  });

  return schema.validate(news);
};
