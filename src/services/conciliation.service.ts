import { saveReportDTO } from "../DTOS/conciliation.dto";
import fs from 'fs';
import https from 'https';

export const conciliateService = async (tempFile:string) => {
	const vendas = fs.readFileSync('./temp/'+tempFile, 'utf8')
				   .toString()
				   .split('\n')
				   .map(e => e.trim())
				   .map(e => e.split(';').map(e => e.trim()));
	const tokenAd = https.get('https://rl7-sandbox-api.useredecloud.com.br/oauth2/token')
		
	}


