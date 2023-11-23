import express from "express";
import { Request, Response } from "express";
import { Package, validate } from "../model/packages";
import _ from "lodash";
import { PackageProps } from "../interfaces/interfaces";
const router = express.Router();

router.get("/", async (req: Request, res: Response, next) => {
  try {
    const packages = await Package.find();
    res.send(packages);
    next();
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const foundPackage = await Package.findById(req.params.id);
    if (!foundPackage)
      return res.status(400).send("The specific id is not available");
    res.send(foundPackage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req: Request, res: Response, next: any) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const packages = new Package(
      _.pick(req.body, [
        "packageName",
        "makkahHotelName",
        "madinahHotelName",
        "price",
        "nullPrice",
        "overview",
      ])
    );
    await packages.save();
    res.send(packages);
    next();
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const packages = await Package.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        packageName: req.body.packageName,
        makkahHotelName: req.body.makkahHotelName,
        madinahHotelName: req.body.madinahHotelName,
        price: req.body.price,
        nullPrice: req.body.nullPrice,
        overview: req.body.overview,
      },
    },
    { new: true }
  );

  if (!packages) return res.status(404).send("The package is not available");
  res.send(packages);
});

router.delete("/:id", async (req, res) => {
  try {
    const packages = await Package.findByIdAndDelete(req.params.id);
    if (!packages) return res.status(404).send("the package is unavailable");
    res.send(packages);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
