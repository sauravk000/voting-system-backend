import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import "dotenv/config";
const router = Router();

const { SECRET } = process.env;

router.post("/register", async (req, res) => {
  try {
    //hashing the password
    req.body.password = await bcrypt.hash(req, body.password, SECRET);
    //Creates a new user
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    res.status(400).json({ error });
  }
});

export default router;
