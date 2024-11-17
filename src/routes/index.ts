import { Router } from 'express';
import userRoutes from './user.route';
import uploadRoute from './file.route';

const router = Router();

router.use('/users',userRoutes);
router.use('/upload', uploadRoute);
export default router;
