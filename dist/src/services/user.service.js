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
exports.createUserService = void 0;
const user_repositorie_1 = require("../repositories/user.repositorie");
const createUserService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repositorie_1.findUserByEmail)(data.email);
    if (user) {
        throw new Error('Usuário já existe');
    }
    console.log("teste");
    // const password = await bcrypt.hash(data.password, 10) 
    // return createUser({ ...data, password });
});
exports.createUserService = createUserService;
