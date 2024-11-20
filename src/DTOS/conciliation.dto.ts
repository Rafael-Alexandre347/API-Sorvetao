import { Decimal } from '@prisma/client/runtime/library'
import { IsNotEmpty, IsDate, IsNumber } from 'class-validator'

export class saveReportDTO{
    @IsNotEmpty()
    @IsNumber()
    id!:number

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
    conciliado!:boolean
}

export class getReportDTO{
    @IsNumber()
    id?:number

    @IsNotEmpty()
    vReal!:number

    @IsNotEmpty()
    data!:string
}