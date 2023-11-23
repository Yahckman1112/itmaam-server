import express from "express";
import mongoose from "mongoose";
const app = express();
import packages from './routes/packages'
import news from './routes/news'

app.use(express.json());
app.use('/api/packages', packages)
app.use('/api/news', news)





mongoose
  .connect("mongodb://127.0.0.1:27017/al-itmaam")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("could not connect ", err));



const port = 5000;
app.listen(port, () => `listening on port ${port}`);
