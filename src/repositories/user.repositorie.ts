import { CreateUserDTO } from '../DTOS/user.dto';
import User from '../entities/user.entity'

export const createUser = async (data:CreateUserDTO) => {
    const user = await User.create({data});
    return {...user,password:undefined};
}

export const findUserByEmail = async (email:string) => {
    return User.findFirst({where: {email} });
}


