import { getReportDTO, saveReportDTO } from "../DTOS/conciliation.dto";
import fs, { access } from "fs";
import * as base64 from "base-64";
import {
  saveReport,
  getReportByLoja,
  deleteAll,
} from "../repositories/conciliation.repository";

export const conciliateService = async (tempFile: string) => {
  const vendas = fs
    .readFileSync("./temp/" + tempFile, "utf8")
    .toString()
    .split("\n")
    .map((e) => e.trim())
    .map((e) => e.split(";").map((e) => e.trim()));

  const credentials = base64.encode(
    "a7bb48c3-c6a6-49d4-b6f5-f9cd9180c7e1:wF8Q60Xs0L"
  );
  const url = "https://rl7-sandbox-api.useredecloud.com.br"; //Teste
  // const url = 'https://api.userede.com.br/redelabs';//Produção
  let initDate = "2024-09-01",
    endDate = "2024-09-30";
  const loja = 13381369; //Teste
  // const loja = 96575034;//Produção
  const formData = new URLSearchParams({
    grant_type: "client_credentials",
  });
  const tokenAd = await fetch(url + "/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  const token = await tokenAd.json();
  const adquirente = await fetch(
    url +
      `/merchant-statement/v1/sales?parentCompanyNumber=${loja}&subsidiaries=${loja}&startDate=${initDate}&endDate=${endDate}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
    }
  );
  let ad = await adquirente.json();
  ad = ad.content.transactions;

  let tax = 0;

  for (let e in vendas) {
    vendas[e].push("0");
    if (typeof vendas[e][6] === "string")
      vendas[e][6] = vendas[e][6]
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".");

    if (typeof vendas[e][3] === "string")
      vendas[e][3] =
        vendas[e][3].split("/")[2] +
        "-" +
        vendas[e][3].split("/")[1] +
        "-" +
        vendas[e][3].split("/")[0];
  }
  let report: saveReportDTO = new saveReportDTO();
  let reports: saveReportDTO[] = [];

  for (let i in ad) {
    // console.log("Valor: "+ad[i].amount+" data: "+ad[i].movementDate);
    // console.log(ad[i]);
    let bandeira = " ";
    for (let x in vendas) {
      if (ad[i].cardNumber[0] == "4") bandeira = "Visa";
      else if (
        Number(ad[i].cardNumber.split("*")[0]) >= 2221 &&
        Number(ad[i].cardNumber.split("*")[0]) <= 2720
      )
        bandeira = "Mastercard";
      else if (
        ad[i].cardNumber[0] + ad[i].cardNumber[1] == "51" ||
        ad[i].cardNumber[0] + ad[i].cardNumber[1] == "52" ||
        ad[i].cardNumber[0] + ad[i].cardNumber[1] == "53" ||
        ad[i].cardNumber[0] + ad[i].cardNumber[1] == "54" ||
        ad[i].cardNumber[0] + ad[i].cardNumber[1] == "55"
      )
        bandeira = "Mastercard";
      else bandeira = "Outros";

      if (
        vendas[x][7] === "0" &&
        vendas[x][6] == ad[i].amount &&
        vendas[x][3] == ad[i].movementDate &&
        ad[i].status == "APPROVED"
      ) {
        vendas[x][7] = "1";
        report = {
          nsu: ad[i].nsu,
          loja: loja,
          vVenda: Number(vendas[x][6]),
          vReal: ad[i].amount,
          data: vendas[x][3],
          taxa: ad[i].feeTotal,
          pagamento: ad[i].modality.type,
          bandeira: bandeira,
          conciliado: true,
        };
        ad[i].status = "CONCILIADO";
      }
    }
    if (ad[i].status != "CONCILIADO") {
      report = {
        nsu: ad[i].nsu,
        loja: loja,
        vVenda: 0,
        vReal: ad[i].amount,
        data: ad[i].movementDate,
        taxa: ad[i].feeTotal,
        pagamento: ad[i].modality.type,
        bandeira: bandeira,
        conciliado: false,
      };
    }
    reports.push(report);
    saveReport(report);
  }
  return reports;
};

export const getReportByDateService = async (data: getReportDTO) => {
  const report = await getReportByLoja(data);
  const arrayNewReport = [];
  const initDate = new Date(data.initDate);
  const endDate = new Date(data.endDate);

  for (let i in report) {
    let reportFilteredByDate = { ...report[i], nsu: Number(report[i].nsu) };
    const reportDate = new Date(report[i].data);
    if (reportDate >= initDate && reportDate <= endDate) {
      arrayNewReport.push(reportFilteredByDate);
    }
  }
  return arrayNewReport;
};

export const deleteAllService = () => {
  return deleteAll();
};
