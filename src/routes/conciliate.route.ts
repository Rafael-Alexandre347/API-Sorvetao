import { Router } from 'express'
import { conciliate, deleteAll, getReportByDate } from '../controllers/conciliation.controller'
import { auth } from '../middlewares/auth.middleware'

const router = Router();

router.post('/', auth, conciliate);
router.post('/getReport', auth, getReportByDate);
router.post('/delete', auth, deleteAll);

export default router;