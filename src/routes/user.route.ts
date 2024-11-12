import { Router } from 'express' 
import { authenticateUser, conciliate, createUser } from '../controllers/user.controller'
import { CreateUserDTO } from '../DTOS/user.dto'
import { validate } from '../middlewares/validate.middleware'

const router = Router();

router.post('/',validate(CreateUserDTO), createUser);
router.post('/authenticate',authenticateUser);
router.post('/conciliate',conciliate);

export default router;