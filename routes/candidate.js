import { Router } from 'express';
import Candidate from '../models/candidate.js';
const router = Router();

router.get('/:cID', (req, res) => {
  try {
    const candidate = Candidate.findOne({
      cid: req.params.cID,
    });
    if(candidate)
      res.json(candidate.toObject());
    else
      res.status(404).json({error: 'Not found'});
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Entered');
    const c = await Candidate.create(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
