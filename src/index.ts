import express from "express";
import mongoose from "mongoose";
const app = express();
import packages from './routes/packages'
import news from './routes/news'
import applicants from './routes/applicants'
import users from './routes/user'
import auth from './routes/auth'

app.use(express.json());
app.use('/api/packages', packages)
app.use('/api/news', news)
app.use('/api/applicants', applicants )
app.use('/api/auth', auth )




mongoose
  .connect("mongodb://127.0.0.1:27017/al-itmaam")
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log("could not connect ", err));



const port = 5000;
app.listen(port, () => `listening on port ${port}`);
