import { saveReportDTO } from "../DTOS/conciliation.dto";
import fs, { access } from 'fs';
import * as base64 from 'base-64';

export const conciliateService = async (tempFile: string) => {
	const vendas = fs.readFileSync('./temp/' + tempFile, 'utf8')
		.toString()
		.split('\n')
		.map(e => e.trim())
		.map(e => e.split(';').map(e => e.trim()));

	const credentials = base64.encode('a7bb48c3-c6a6-49d4-b6f5-f9cd9180c7e1:wF8Q60Xs0L');
	const url = 'https://rl7-sandbox-api.useredecloud.com.br';
	let initDate = '2024-09-01',
		endDate = '2024-09-30'
	const loja = 13381369;
	const formData = new URLSearchParams({
		"grant_type":"client_credentials"
	});
	const tokenAd = await fetch(url+'/oauth2/token',{
		method:'POST',
		headers:{
			'Authorization': `Basic ${credentials}`,
			'Content-Type':'application/x-www-form-urlencoded'
		},
		body:formData.toString()
	}); 
	const token = await tokenAd.json();
	const adquirente = await fetch(url+`/merchant-statement/v1/sales?parentCompanyNumber=${loja}&subsidiaries=${loja}&startDate=${initDate}&endDate=${endDate}`,{
		method:'GET',
		headers:{
			'Authorization': `Bearer ${token.access_token}`,
			'Content-Type':'application/json'
		}
	});
	let ad = await adquirente.json();
	ad = ad.content.transactions;
	for(let i in ad){
		console.log(ad[i].amount);
	}
}