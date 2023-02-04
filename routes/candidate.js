import { Router } from "express";
const router = Router();

router.get("/:cID", (req, res) => {
  res.json({
    cid: req.params.cID,
  });
});

export default router;
