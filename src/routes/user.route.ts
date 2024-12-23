import { Router } from "express";
import {
  authenticateUser,
  createUser,
  findUserByEmail,
  updateUser,
} from "../controllers/user.controller";
import { CreateUserDTO, UpdateUserDto } from "../DTOS/user.dto";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.post("/", validate(CreateUserDTO), createUser);
router.get("/:email", findUserByEmail);
router.patch("/:email", validate(UpdateUserDto), updateUser);
router.post("/authenticate", authenticateUser);

export default router;
