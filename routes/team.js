import { Router } from "express";
import Team from '../models/team.js';
import authorize from "../auth/authorize.js";
const router = Router();


router.use(authorize);

router.get('/getTeam/:tCid', async(req, res)=> {
  try{
    const team = await Team.findOne({tCid:req.params.tCid});
    if(team)
      res.json(team.toObject());
    else
      res.status(404).json({error: 'Not found'});
  }catch(err) {
    res.status(400).json({error:err});
  }
})

router.post('/create', async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.json({success: true});
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

router.post('/addCandidate', async (req, res)=> {
  try {
    const {tCid, cid} = req.body;
    const team = await Team.findOne({tCid: tCid});
    if(team){
      team.candidates.push(cid);
      team.save();
    }
    res.json({success:true});
  }catch(err) {
    res.status(400).json({error: err});
  }
})

export default router;