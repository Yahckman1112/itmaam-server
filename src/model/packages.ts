import mongoose from "mongoose";
import { PackageProps } from "./../interfaces/interfaces";
const Joi = require("joi-browser");

const packageSchema = new mongoose.Schema<PackageProps>({
  packageName: { type: String, required: true },
  makkahHotelName: { type: String, required: true },
  madinahHotelName: { type: String, required: true },
  time: { type: Number, required: true },
  registeredClient: { type: Number, required: true },
  totalSpace: { type: Number, required: true },
  price: { type: Number, required: true },
  nullPrice: { type: Number, required: true },
  overview: { type: String, required: true },
});

export const Package = mongoose.model("Package", packageSchema);

export const validate = (packages: PackageProps) => {
  const schema = Joi.object({
    packageName: Joi.string().required(),
    makkahHotelName: Joi.string().required(),
    madinahHotelName: Joi.string().required(),
    time: Joi.number().required(),
    registeredClient: Joi.number().required(),
    totalSpace: Joi.number().required(),
    price: Joi.number().required(),
    nullPrice: Joi.number().required(),
    overview: Joi.string().required(),
  });

  return schema.validate(packages);
};
