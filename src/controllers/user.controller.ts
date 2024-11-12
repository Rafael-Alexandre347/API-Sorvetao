import { Request, Response } from 'express' 
import { authenticateUserService ,createUserService, conciliateService } from '../services/user.service' 

export const createUser = async (req: Request, res: Response) => {
  	try {
    	const user = await createUserService(req.body)
		return res.status(201).json(user)
	} catch (error) {
		return res.status(400).json({ message: error })
	}
}

export const authenticateUser = async (req: Request,res:Response) =>{
	try{
		const {email,password} = req.body;
		if(!email || !password){
			return res.status(400).json({message: 'Deve-se inserir e-mail e senha!'});
		}
		const token = await authenticateUserService(email,password);
		return res.status(200).json({token});
	}catch(error){
		return res.status(400).json({message:error});
	}
}

export const conciliate = async (req: Request, res:Response) =>{
	try{
		const {tempFile} = req.body;
		const content = await conciliateService(tempFile);
		return res.status(200).json(content);
	}catch(error){
		return res.status(400).json({message:error});
	}
}