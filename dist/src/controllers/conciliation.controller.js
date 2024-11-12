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
exports.conciliate = void 0;
const conciliation_service_1 = require("../services/conciliation.service");
const conciliate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tempFile } = req.body;
        const content = yield (0, conciliation_service_1.conciliateService)(tempFile);
        return res.status(200).json(content);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
exports.conciliate = conciliate;
