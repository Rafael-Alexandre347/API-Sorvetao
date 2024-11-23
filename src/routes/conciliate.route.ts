import { Router } from 'express'
import { conciliate, getReportByDate } from '../controllers/conciliation.controller'
import { deleteAll} from '../repositories/conciliation.repository';

const router = Router();

router.post('/',conciliate);
router.post('/getReport',getReportByDate);
router.post('/delete',deleteAll);

export default router;