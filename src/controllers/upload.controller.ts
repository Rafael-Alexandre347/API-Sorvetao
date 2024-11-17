import { Request, Response } from 'express';
import { saveFile } from '../services/upload.service';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
    }

    const { originalname, buffer } = req.file;

    // Chama o serviço para salvar o arquivo
    const result = await saveFile(originalname, buffer);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer upload do arquivo.', error });
  }
};
