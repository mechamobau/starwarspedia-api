import { Router } from 'express';
import { getSwapiData } from '../controllers/swapi.controller';

const router = Router();

router.get('/:resource/:id', getSwapiData);
router.get('/:resource/', getSwapiData);

export default router;
