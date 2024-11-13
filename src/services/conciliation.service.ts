import { saveReportDTO } from "../DTOS/conciliation.dto";
import fs from 'fs';
import * as base64 from 'base-64';

export const conciliateService = async (tempFile: string) => {
	const vendas = fs.readFileSync('./temp/' + tempFile, 'utf8')
		.toString()
		.split('\n')
		.map(e => e.trim())
		.map(e => e.split(';').map(e => e.trim()));

	const credentials = base64.encode('a7bb48c3-c6a6-49d4-b6f5-f9cd9180c7e1:wF8Q60Xs0L');
	const formData = new URLSearchParams({
		grant_type:'client_credentials'
	});
	const tokenAd = await fetch('https://rl7-sandbox-api.useredecloud.com.br/',{
		method:'POST',
		headers:{
			'Authorization': `Basic ${credentials}`,
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body:formData.toString()
	});
	console.log(tokenAd);
}


