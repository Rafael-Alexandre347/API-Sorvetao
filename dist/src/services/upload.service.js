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
exports.saveFile = void 0;
const upload_repository_1 = require("../repositories/upload.repository");
const path_1 = __importDefault(require("path"));
const saveFile = (fileName, fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifica se o arquivo é um CSV
    if (path_1.default.extname(fileName).toLowerCase() !== '.csv') {
        return { success: false, message: 'Apenas arquivos CSV são permitidos.' };
    }
    try {
        // Define o nome fixo do arquivo na pasta .temp
        const saved = yield (0, upload_repository_1.writeFileToDisk)('vendas.csv', fileBuffer);
        if (saved) {
            return { success: true, message: 'Arquivo enviado com sucesso!' };
        }
        return { success: false, message: 'Falha ao salvar o arquivo.' };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: 'Erro inesperado ao salvar o arquivo.' };
    }
});
exports.saveFile = saveFile;
