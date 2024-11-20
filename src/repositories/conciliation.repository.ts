import Conciliation from "../entities/conciliation.entity";
import { saveReportDTO, getReportDTO } from "../DTOS/conciliation.dto";

export const saveReport = async (data:saveReportDTO) =>{
    const report = Conciliation.create({data});
    return {...report};
}

export const getReportById = async (data:getReportDTO) => {
    const report = Conciliation.findFirst({where:{id:data.id,vReal:data.vReal,data:data.data}});
    return {...report};
}

export const getAllReport = async () => {
    const report = Conciliation.findMany();
    return {...report};
}