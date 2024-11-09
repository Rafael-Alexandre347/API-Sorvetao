import bcrypt from 'bcrypt'
import { CreateUserDTO } from '../DTOS/user.dto'
import { createUser, findUserByEmail } from '../repositories/user.repositorie'

export const createUserService = async (data: CreateUserDTO) => {
  const user = await findUserByEmail(data.email)

  if (user) {
    throw new Error('Usuário já existe')
  }
  const password = await bcrypt.hash(data.password, 10) 

  return createUser({ ...data, password});
}