import express from "express";
import { Request, Response } from "express";
import _ from "lodash";
import { New, validate } from "../model/news";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/", async (req, res) => {
  // res.send('News')
  const news = await New.find();
  res.send(news);
});

router.get("/:id",  async (req, res) => {
  const news = await New.findById(req.params.id);
  if (!news) return res.status(400).send("The specific id is not available");
  res.send(news);
});

router.post("/", auth, async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const news = new New(
    _.pick(req.body, ["headLine", "writer", "date", "news"])
  );

  await news.save();
  res.send(news);
});

router.put("/:id", auth,  async (req: Request, res: Response) => {
  const news = await New.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        headLine: req.body.headLine,
        writer: req.body.writer,
        news: req.body.news,
      },
    },
    { new: true }
  );

  if (!news) return res.status(404).send("Unavailable news");
  res.send(news);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const news = await New.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).send("the news is unavailable");
    res.send(news);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
