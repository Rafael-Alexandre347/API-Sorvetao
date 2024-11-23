import { Router } from 'express';
import multer from 'multer';
import { uploadFile } from '../controllers/upload.controller';
import { auth } from '../middlewares/auth.middleware'

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', auth, upload.single('file'), uploadFile);

export default router;
