"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.updateUser = exports.findUserByEmail = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUserService)(req.body);
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.createUser = createUser;
const findUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield (0, user_service_1.findUserByEmailService)(email);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.findUserByEmail = findUserByEmail;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.updateUserService)(String(req.params.email), req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.updateUser = updateUser;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Deve-se inserir e-mail e senha!' });
        }
        const token = yield (0, user_service_1.authenticateUserService)(email, password);
        return res.status(200).json({ token });
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.authenticateUser = authenticateUser;
