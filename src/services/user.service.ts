import bcrypt from "bcrypt";
import { CreateUserDTO, UpdateUserDto } from "../DTOS/user.dto";
import {
  createUser,
  findUserByEmail,
  updateUser,
} from "../repositories/user.repository";
import * as jose from "jose";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export const createUserService = async (data: CreateUserDTO) => {
  const user = await findUserByEmail(data.email);

  if (user) {
    throw new CustomError("Usuário já existe", 400);
  }
  const password = await bcrypt.hash(data.password, 10);

  return createUser({ ...data, password });
};

export const findUserByEmailService = async (email: string) => {
  if (!email) {
    throw new Error("O email é obrigatório.");
  }

  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};

export const updateUserService = async (email: string, data: UpdateUserDto) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const updatedData = {
    ...data,
    password: data.password
      ? await bcrypt.hash(data.password, 10)
      : user.password,
  };

  return updateUser(email, updatedData);
};

export const authenticateUserService = async (
  email: string,
  password: string
) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Usuário não encontrado :(");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Senha Inválida");
  }

  const payload = { id: user.id, email: user.email };
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = "HS256";

  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer("http://localhost:3000")
    .setSubject("users")
    .setExpirationTime("1h")
    .sign(secret);

  return token;
};
