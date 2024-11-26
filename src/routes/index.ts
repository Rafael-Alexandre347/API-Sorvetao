import { Router } from "express";
import userRoutes from "./user.route";
import uploadRoute from "./file.route";
import conciliationRoute from "./conciliate.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/upload", uploadRoute);
router.use("/conciliate", conciliationRoute);
export default router;
