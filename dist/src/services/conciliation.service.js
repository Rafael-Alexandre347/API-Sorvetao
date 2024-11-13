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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conciliateService = void 0;
const fs_1 = __importDefault(require("fs"));
const conciliateService = (tempFile) => __awaiter(void 0, void 0, void 0, function* () {
    const vendas = fs_1.default.readFileSync('./temp/' + tempFile, 'utf8')
        .toString()
        .split('\n')
        .map(e => e.trim())
        .map(e => e.split(';').map(e => e.trim()));
    const header = new Headers();
    header.set('Authorization', 'Basic ' + btoa('a7bb48c3-c6a6-49d4-b6f5-f9cd9180c7e1:wF8Q60Xs0L')),
        header.set('Content-type', 'application/x-www-form-urlencoded;grant_type:client_credentials');
    const options = {
        headers: header,
        method: 'POST'
    };
    const tokenAd = yield fetch('https://rl7-sandbox-api.useredecloud.com.br/', options);
    console.log(tokenAd);
});
exports.conciliateService = conciliateService;
