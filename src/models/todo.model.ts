import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ITodo extends Document {
    _id: Types.ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    isCompleted: boolean;
    isDeleted: boolean;
    user: Types.ObjectId;
}

const todoSchema: Schema<ITodo> = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

todoSchema.index({ user: 1, isCompleted: 1, isDeleted: 1 });
todoSchema.index({ dueDate: 1, isDeleted: 1 });
todoSchema.index({ user: 1, dueDate: 1, isDeleted: 1 });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;