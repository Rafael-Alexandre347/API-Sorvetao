import Conciliation from "../entities/conciliation.entity";
import { saveReportDTO } from "../DTOS/conciliation.dto";

export const saveReport = async (data:saveReportDTO) =>{
    const report = Conciliation.create({data});
    return {...report}
}

