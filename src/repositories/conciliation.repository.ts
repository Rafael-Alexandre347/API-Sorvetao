import Conciliation from "../entities/conciliation.entity";
import { saveReportDTO, getReportDTO } from "../DTOS/conciliation.dto";

export const saveReport = async (data:saveReportDTO) =>{
    const report = Conciliation.create({data});
    return {...report};
}

export const getReportByLoja = async (data:getReportDTO) => {
    return Conciliation.findMany({where:{loja:data.loja}});
}

export const deleteAll = async () => {
    return Conciliation.deleteMany();
}