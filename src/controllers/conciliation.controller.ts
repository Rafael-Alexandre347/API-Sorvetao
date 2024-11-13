import { Request, Response } from 'express' 
import { conciliateService } from '../services/conciliation.service';
import { saveReportDTO } from '../DTOS/conciliation.dto';


export const conciliate = async (req: Request, res:Response) =>{
	try{
		const {tempFile} = req.body;
		const content = await conciliateService(tempFile);
		return res.status(200).json(content);
	}catch(error){
		return res.status(400).json({message: error});
	}
}