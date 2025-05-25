import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import * as userService from './user.service.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../middleware/error.middleware.js';
import logger from '../utils/logger.js';

export async function signup(email: string, password: string): Promise<string> {
    logger.info(`AuthService.signup Params: ${email}`)
    const user = await userService.createUser(email, password);
    return generateToken(user._id);
}

export async function login(email: string, password: string): Promise<string> {
    logger.info(`AuthService.login Params: ${email}`)
    let user;
    try {
        user = await userService.findByEmail(email);
    } catch (error) {
        logger.error(`Invalid email or password Params: ${email}`)
        throw new AppError('Invalid email or password', 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.error(`Invalid email or password Params: ${email}`)
        throw new AppError('Invalid email or password', 401);
    }

    return generateToken(user._id);
}

function generateToken(userId: Types.ObjectId): string {
    logger.info(`AuthService.generateToken Params: ${userId}`)
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}