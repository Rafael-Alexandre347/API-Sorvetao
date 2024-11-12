import bcrypt from 'bcrypt'
import { CreateUserDTO } from '../DTOS/user.dto'
import { createUser, findUserByEmail } from '../repositories/user.repository'
import * as jose from 'jose';
import fs from 'fs';

export const createUserService = async (data: CreateUserDTO) => {
	const user = await findUserByEmail(data.email)

	if (user) {
		throw new Error('Usuário já existe')
	}
	const password = await bcrypt.hash(data.password, 10)

	return createUser({...data, password});
}

export const authenticateUserService = async (email:string,password:string) => {
	const user = await findUserByEmail(email);

	if(!user){
		throw new Error("Usuário não encontrado :(");
	}

	const isValid = await bcrypt.compare(password, user.password);

	if(!isValid){
		throw new Error("Senha Inválida");
	}

	const payload = {id: user.id, email:user.email}
	const secret = new TextEncoder().encode(process.env.JWT_SECRET);
	const alg = 'HS256';

	const token = await new jose.SignJWT(payload)
		.setProtectedHeader({alg})
		.setIssuedAt()
		.setIssuer("http://localhost:3000")
		.setSubject('users')
		.setExpirationTime('1h')
		.sign(secret);

	return token;
}