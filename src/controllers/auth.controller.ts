import { Request, Response } from 'express';
import { login, signup } from '../services/auth.service.js';

export const signupController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;
    const token = await signup(email, password);
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    
    res.status(201).json({ message: 'User created successfully' });
};

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;
    const token = await login(email, password);
    
    // Set token in HTTP-only cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000 // 1 hour
    });
    
    res.status(200).json({ message: 'Logged in successfully' });
};
