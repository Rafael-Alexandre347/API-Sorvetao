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
exports.uploadFile = void 0;
const upload_service_1 = require("../services/upload.service");
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
        }
        const { originalname, buffer } = req.file;
        // Chama o serviço para salvar o arquivo
        const result = yield (0, upload_service_1.saveFile)(originalname, buffer);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao fazer upload do arquivo.', error });
    }
});
exports.uploadFile = uploadFile;
