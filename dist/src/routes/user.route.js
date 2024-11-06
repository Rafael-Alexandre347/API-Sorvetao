"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const user_dto_1 = require("../DTOS/user.dto");
const router = (0, express_1.Router)();
router.post('/', (0, validate_middleware_1.validate)(user_dto_1.createUserDTO), user_controller_1.createUser);
exports.default = router;
