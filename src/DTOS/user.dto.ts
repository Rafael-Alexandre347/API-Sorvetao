import {IsString,IsNotEmpty,IsEmail, MinLength} from "class-validator"

export class createUserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string
    
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password!: string
}