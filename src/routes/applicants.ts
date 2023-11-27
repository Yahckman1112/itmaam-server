import express from "express";
import _ from "lodash";
import { Request, Response } from "express";
import { validateApplicants, Applicant } from "../model/applicants";
const router = express.Router();

router.get("/", async(req:Request, res:Response) => {
//   res.send("applicants");
const applicants = await Applicant.find()
res.send(applicants)
});

router.get("/:id", async (req: Request, res: Response) => {
  const applicant = await Applicant.findById(req.params.id);
  if (!applicant)
    return res.status(400).send("There is no Applicant with this id");
  res.send(applicant);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateApplicants(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let applicant = await Applicant.findOne({ phone: req.body.phone });
  if (applicant) return res.status(400).send("This number has registered");

  applicant = new Applicant(
    _.pick(req.body, ["firstName", "lastName", "email", "phone"])
  );

  await applicant.save();
  res.send(applicant);
});

export default router;
