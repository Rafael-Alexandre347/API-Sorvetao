import { saveReportDTO } from "../DTOS/conciliation.dto";
import fs from 'fs';

export const conciliateService = async (tempFile:string,data:saveReportDTO) => {
	const file = fs.readFileSync('./temp/'+tempFile, 'utf8')
				   .toString()
				   .split('\n')
				   .map(e => e.trim())
				   .map(e => e.split(';').map(e => e.trim()));;
	return file;
}