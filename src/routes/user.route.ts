import { Router } from 'express' 
import { authenticateUser, createUser, findUserByEmail, updateUser } from '../controllers/user.controller'
import { conciliate } from '../controllers/conciliation.controller'
import { CreateUserDTO, UpdateUserDto } from '../DTOS/user.dto'
import { validate } from '../middlewares/validate.middleware'

const router = Router();

router.post('/',validate(CreateUserDTO), createUser);
router.get('/:email',findUserByEmail);
router.patch('/:email', validate(UpdateUserDto), updateUser);
router.post('/authenticate',authenticateUser);
router.post('/conciliate',conciliate);

export default router;