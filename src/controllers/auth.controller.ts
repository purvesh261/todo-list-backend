import { Request, Response } from 'express';
import { signup } from '../services/auth.service.js';

export async function signupController(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const token = await signup(email, password);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Signup failed', error: error });
    }
}
