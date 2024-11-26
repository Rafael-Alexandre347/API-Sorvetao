"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserService = exports.updateUserService = exports.findUserByEmailService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const jose = __importStar(require("jose"));
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserByEmail)(data.email);
    if (user) {
        throw new Error('Usuário já existe');
    }
    const password = yield bcrypt_1.default.hash(data.password, 10);
    return (0, user_repository_1.createUser)(Object.assign(Object.assign({}, data), { password }));
});
exports.createUserService = createUserService;
const findUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email) {
        throw new Error('O email é obrigatório.');
    }
    const user = yield (0, user_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    return user;
});
exports.findUserByEmailService = findUserByEmailService;
const updateUserService = (email, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const updatedData = Object.assign(Object.assign({}, data), { password: data.password ? yield bcrypt_1.default.hash(data.password, 10) : user.password });
    return (0, user_repository_1.updateUser)(email, updatedData);
});
exports.updateUserService = updateUserService;
const authenticateUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repository_1.findUserByEmail)(email);
    if (!user) {
        throw new Error("Usuário não encontrado :(");
    }
    const isValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isValid) {
        throw new Error("Senha Inválida");
    }
    const payload = { id: user.id, email: user.email };
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = 'HS256';
    const token = yield new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer("http://localhost:3000")
        .setSubject('users')
        .setExpirationTime('1h')
        .sign(secret);
    return token;
});
exports.authenticateUserService = authenticateUserService;
