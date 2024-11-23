import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class saveReportDTO {

  @IsNotEmpty()
  nsu!:number

  @IsNotEmpty()
  vVenda!: number;

  @IsNotEmpty()
  vReal!: number;

  @IsNotEmpty()
  @IsDate()
  data!: string;

  @IsNotEmpty()
  taxa!: number;

  @IsNotEmpty()
  pagamento!: string;

  @IsNotEmpty()
  bandeira!: string;

  @IsNotEmpty()
  conciliado!: boolean;
}

export class getReportDTO {
  @IsNumber()
  id!: number;

  vReal?: number;

  data?: string;
}
