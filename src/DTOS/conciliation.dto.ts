import { Decimal } from '@prisma/client/runtime/library'
import { IsNotEmpty, IsDate } from 'class-validator'

export class saveReportDTO{
    @IsNotEmpty()
    vVenda!:number
    
    @IsNotEmpty()
    vReal!:number

    @IsNotEmpty()
    @IsDate()
    data!:string
    
    @IsNotEmpty()
    taxa!:number

    @IsNotEmpty()
    pagamento!:string

    @IsNotEmpty()
    bandeira!:string

    @IsNotEmpty()
    conciliado!:number
}