import User, { IUser } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export async function signup(email: string, password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    return generateToken(user._id);
}

function generateToken(userId: Types.ObjectId): string {
    return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}