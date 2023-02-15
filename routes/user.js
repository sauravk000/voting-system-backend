import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const router = Router();

const { SECRET } = process.env;

router.post('/register', async (req, res) => {
  try {
    //hashing the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    //Creates a new user
    const user = await User.create(req.body);

    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/login', async (req, res) => {
  try {
    // If the user exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      //If the password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // Signing the token
        const token = jwt.sign({ username: user.username }, SECRET, {
          expiresIn: '1d',
        });
        res.json({ token });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
