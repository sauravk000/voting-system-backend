import { Router } from "express";
import Candidate from "../models/candidate.js";
const router = Router();

router.get("/:cID", (req, res) => {
  res.json({
    cid: req.params.cID,
  });
});

router.post('/', async (req, res) => {
  try{
    console.log("Entered");
    const c = await Candidate.create(req.body);
    res.json({success: true});
  }catch(err) {
    res.status(400).json({ error: err });
  }
})

export default router;
