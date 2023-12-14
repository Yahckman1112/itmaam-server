import express from "express";
import { Request, Response } from "express";
import { Notification, validate } from "../model/notification";
import _ from "lodash";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const notify = await Notification.find().sort({ createdAt: -1 });
  res.send(notify);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notify = new Notification(_.pick(req.body, ["title", "body", "time"]));

  await notify.save();
  res.send(notify);
});


export default router;
