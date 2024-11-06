import { Router } from 'express' 
import { createUser } from '../controllers/user.controller'
import { validate } from '../middlewares/validate.middleware' 
import { createUserDTO } from '../DTOS/user.dto'

const router = Router() 

router.post('/',validate(createUserDTO), createUser) 

export default router 