import { Router } from "express";
import { mongoose } from "../db/connection.js";
const router = Router();

router.get("/:cID", (req, res) => {
  res.json({
    cid: req.params.cID,
  });
});

export default router;
