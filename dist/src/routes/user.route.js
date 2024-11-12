"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_dto_1 = require("../DTOS/user.dto");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
router.post('/', (0, validate_middleware_1.validate)(user_dto_1.CreateUserDTO), user_controller_1.createUser);
router.post('/authenticate', user_controller_1.authenticateUser);
router.post('/conciliate', user_controller_1.conciliate);
exports.default = router;
