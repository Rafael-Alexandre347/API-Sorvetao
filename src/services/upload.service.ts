import { writeFileToDisk } from "../repositories/upload.repository";
import path from "path";

export const saveFile = async (fileName: string, fileBuffer: Buffer) => {
  // Verifica se o arquivo é um CSV
  if (path.extname(fileName).toLowerCase() !== ".csv") {
    return { success: false, message: "Apenas arquivos CSV são permitidos." };
  }

  try {
    // Define o nome fixo do arquivo na pasta .temp
    const saved = await writeFileToDisk("vendas.csv", fileBuffer);

    if (saved) {
      return { success: true, message: "Arquivo enviado com sucesso!" };
    }

    return { success: false, message: "Falha ao salvar o arquivo." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro inesperado ao salvar o arquivo." };
  }
};
