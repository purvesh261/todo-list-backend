import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as userService from './user.service.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/error.middleware.js';

export async function signup(email: string, password: string): Promise<string> {
    const user = await userService.createUser(email, password);
    return generateToken(user._id);
}

export async function login(email: string, password: string): Promise<string> {
    let user;
    try {
        user = await userService.findByEmail(email);
    } catch (error) {
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
    }

    return generateToken(user._id);
}

function generateToken(userId: Types.ObjectId): string {
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}