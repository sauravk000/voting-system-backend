import { Router } from 'express';
import authorize from '../auth/authorize.js';
const router = Router();

router.use(authorize);

router.get('/', (req, res) => {
  res.json(`${req.user.username} has been verified`);
});

export default router;
