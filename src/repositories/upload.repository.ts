import fs from 'fs-extra';
import path from 'path';

const tempFolder = path.join(__dirname, '../../temp');

fs.ensureDirSync(tempFolder);

export const writeFileToDisk = async (fileName: string, fileBuffer: Buffer) => {
  try {
    const filePath = path.join(tempFolder, fileName);
    await fs.writeFile(filePath, fileBuffer);
    return true;
  } catch (error) {
    console.error('Erro ao salvar o arquivo:', error);
    return false;
  }
};
