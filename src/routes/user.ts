import express from "express";
import { validateUser, User } from "../model/user";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import _ from 'lodash'
import auth from "../middleware/auth";
const router = express.Router();

router.get("/", async(req, res) => {
  const users = await User.find()
  res.send(users);
});

router.post("/",  async (req: Request, res: Response, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    
    
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered");
  
    user = new User({
      fullName: req.body.fullName,
      role: req.body.role,
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
  

    const token = user.generateAuthToken()
  
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'fullName', 'userName', 'email','role']));
    console.log(token);

    next()
    
  } catch (error) {
    res.send(error)
  }
});

export default router;
