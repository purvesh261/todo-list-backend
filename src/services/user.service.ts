import { Types } from "mongoose";
import User, { IUser } from "../models/user.model.js"
import { AppError } from "../middleware/error.middleware.js";

export async function createUser(email: string, password: string): Promise<IUser> {
    if(await checkUserExistsByEmail(email)) {
        throw new AppError('User already exists', 400);
    }
    const user = new User({ email, password });
    await user.save()
    return user;
}

export async function checkUserExistsByEmail(email: string): Promise<{
    _id: Types.ObjectId;
} | null> {
    return await User.exists({ email }).exec()
}

export async function findByEmail(email: string): Promise<IUser> {
    const user = await User.findOne({ email }).exec();
    if(!user) throw new Error("User not found");
    return user;
}