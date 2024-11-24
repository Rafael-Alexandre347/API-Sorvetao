import { Request, Response } from "express";
import {
  authenticateUserService,
  createUserService,
  findUserByEmailService,
  updateUserService,
} from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const findUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await findUserByEmailService(email);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(String(req.params.email), req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Deve-se inserir e-mail e senha!" });
    }
    const token = await authenticateUserService(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
