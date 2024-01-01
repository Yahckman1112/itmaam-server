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

router.delete("/:id", async (req, res) => {
  try {
    const notify = await Notification.findByIdAndDelete(req.params.id);
    if (!notify) return res.status(404).send("the package is unavailable");
    res.send(notify);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});



export default router;
