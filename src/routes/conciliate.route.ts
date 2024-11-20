import { Router } from 'express'
import { conciliate } from '../controllers/conciliation.controller'

const router = Router();
router.post('/conciliate',conciliate);

export default router;