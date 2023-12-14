import express from "express";
import _ from "lodash";
import { Request, Response } from "express";
import { validateApplicants, Applicant } from "../model/applicants";
import auth from "../middleware/auth";
const router = express.Router();

// router.get("/", auth, async(req:Request, res:Response) => {
router.get("/", async (req: Request, res: Response) => {
  //   res.send("applicants");
  const applicants = await Applicant.find();
  res.send(applicants);
});

router.get("/:id", auth, async (req: Request, res: Response) => {
  const applicant = await Applicant.findById(req.params.id);
  if (!applicant)
    return res.status(400).send("There is no Applicant with this id");
  res.send(applicant);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateApplicants(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const applicnts = await Applicant.find();

  let applicant = await Applicant.findOne({ phone: req.body.phone });
  if (applicant) return res.status(400).send("This number has registered");

  const num = `${Math.floor(Math.random() * 900)}`;

  applicant = new Applicant({
    applicantsId: `itmaam23/${applicnts.length + 1}${num}`,
    pronoun: req.body.pronoun,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    package: req.body.package,
    email: req.body.email,
    phone: req.body.phone,
  });

  await applicant.save();
  res.send(applicant);
});

export default router;
