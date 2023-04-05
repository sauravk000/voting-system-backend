import { Router } from 'express';
import authorize from '../auth/authorize.js';
import { getContractAddress, getabi } from '../utils/constants.js';
const router = Router();

router.use(authorize);

router.get('/getContractAddress', async (req, res) => {
  res.json({ contractAddress:  await getContractAddress(), abi: await getabi()});
});

router.get('/', (req, res) => {
  res.json(`${req.user.username} has been verified`);
});

export default router;
