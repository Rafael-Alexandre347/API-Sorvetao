import { saveReportDTO } from "../DTOS/conciliation.dto";
import { CreateUserDTO, UpdateUserDto } from "../DTOS/user.dto";
import User from "../entities/user.entity";

export const createUser = async (data: CreateUserDTO) => {
  const user = await User.create({ data });
  return { ...user, password: undefined };
};

export const findUserByEmail = async (email: string) => {
  return User.findFirst({ where: { email } });
};

export const updateUser = async (email: string, data: UpdateUserDto) => {
  return User.update({ where: { email }, data });
};
