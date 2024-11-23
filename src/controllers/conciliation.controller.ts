import { Request, Response } from 'express' 
import { conciliateService, getReportByDateService } from '../services/conciliation.service';
import { getReportDTO, saveReportDTO } from '../DTOS/conciliation.dto';


export const conciliate = async (req: Request, res:Response) =>{
	try{
		const {tempFile} = req.body;
		const content = await conciliateService(tempFile);
		return res.status(200).json(content);
	}catch(error){
		return res.status(400).json({message: error});
	}
}

export const getReportByDate = async (req: Request, res: Response) => {
	try {
	  const { initDate, endDate, loja } = req.body;
	  
	  // Verificando se os dados necessários estão presentes
	  if (!initDate || !endDate || !loja) {
		return res.status(400).json({ message: 'Missing required parameters.' });
	  }
  
	  // Validando formato das datas
	  const isValidDate = (date: string) => !isNaN(new Date(date).getTime());
	  if (!isValidDate(initDate) || !isValidDate(endDate)) {
		return res.status(400).json({ message: 'Invalid date format.' });
	  }
  
	  const data: getReportDTO = { loja, initDate, endDate };
	  
	  // Chama o serviço para pegar os relatórios
	  const report = await getReportByDateService(data);
	  
	  // Retorna o relatório filtrado em formato JSON (o Express já faz isso automaticamente)
	  return res.status(200).json(report);
	  
	} catch (error) {
	  console.error('Error occurred:', error);
	  return res.status(400).json({ message: error instanceof Error ? error.message : 'An unknown error occurred' });
	}
  }