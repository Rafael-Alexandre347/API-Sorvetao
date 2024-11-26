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
exports.writeFileToDisk = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const tempFolder = path_1.default.join(__dirname, '../../temp');
fs_extra_1.default.ensureDirSync(tempFolder);
const writeFileToDisk = (fileName, fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path_1.default.join(tempFolder, fileName);
        yield fs_extra_1.default.writeFile(filePath, fileBuffer);
        return true;
    }
    catch (error) {
        console.error('Erro ao salvar o arquivo:', error);
        return false;
    }
});
exports.writeFileToDisk = writeFileToDisk;
