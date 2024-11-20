"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const conciliation_controller_1 = require("../controllers/conciliation.controller");
const user_dto_1 = require("../DTOS/user.dto");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
router.post('/', (0, validate_middleware_1.validate)(user_dto_1.CreateUserDTO), user_controller_1.createUser);
router.get('/:email', user_controller_1.findUserByEmail);
router.patch('/:email', (0, validate_middleware_1.validate)(user_dto_1.UpdateUserDto), user_controller_1.updateUser);
router.post('/authenticate', user_controller_1.authenticateUser);
router.post('/conciliate', conciliation_controller_1.conciliate);
exports.default = router;
