import Todo, { ITodo } from '../models/todo.model.js';
import { TodoResponse, PaginatedResponse, GetTodosParams } from '../types/todo.types.js';
import logger from '../utils/logger.js';

export const createTodo = async (todoData: Partial<ITodo>): Promise<TodoResponse> => {
    logger.info(`TodoService.createTodo\nParams: ${todoData}`);
    const todo = new Todo(todoData);
    await todo.save();
    const response: TodoResponse = {
        _id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted
    }
    return response;
}

export const getTodoById = async (todoId: string, userId: string): Promise<TodoResponse | null> => {
    logger.info(`TodoService.getTodoById\nParams: ${todoId} ${userId}`);
    const todo = await Todo.findOne({ _id: todoId, user: userId, isDeleted: false })
        .select('_id title description dueDate isCompleted')
        .lean()
        .exec();

    if (!todo) return null;

    return {
        _id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted
    };
}

export const updateTodo = async (todoId: string, userId: string, updateData: Partial<ITodo>): Promise<TodoResponse | null> => {
    logger.info(`TodoService.updateTodo\nParams: ${todoId} ${userId} ${updateData}`);
    const todo = await Todo.findOneAndUpdate(
        { _id: todoId, user: userId, isDeleted: false },
        { $set: updateData },
        { new: true }
    )
    .select('_id title description dueDate isCompleted')
    .lean()
    .exec();

    if (!todo) return null;

    return {
        _id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted
    };
}

export const deleteTodo = async (todoId: string, userId: string): Promise<boolean> => {
    logger.info(`TodoService.deleteTodo\nParams: ${todoId} ${userId}`);
    const result = await Todo.findOneAndUpdate(
        { _id: todoId, user: userId, isDeleted: false },
        { isDeleted: true }
    ).exec();

    return !!result;
}

export const getTodos = async (userId: string, params: GetTodosParams): Promise<PaginatedResponse<TodoResponse>> => {
    logger.info(`TodoService.getTodos\nParams: userId:${userId} todoParams:${JSON.stringify(params)}`);
    const { page = 1, limit = 10, filters = {}, sort = { field: 'createdAt', order: 'desc' } } = params;
    
    const query: any = { user: userId, isDeleted: false };
    
    if (filters.isCompleted !== undefined) {
        query.isCompleted = filters.isCompleted;
    }
    
    if (filters.dueDateFrom || filters.dueDateTo) {
        query.dueDate = {};
        if (filters.dueDateFrom) query.dueDate.$gte = filters.dueDateFrom;
        if (filters.dueDateTo) query.dueDate.$lte = filters.dueDateTo;
    }
    
    if (filters.search) {
        const searchTerms = filters.search.trim().split(/\s+/);
        const searchRegex = searchTerms.map(term => new RegExp(term, 'i'));
        query.$or = [
            { title: { $in: searchRegex } },
            { description: { $in: searchRegex } }
        ];
    }
    
    const skip = (page - 1) * limit;
    
    const [todos, total] = await Promise.all([
        Todo.find(query)
            .select('_id title description dueDate isCompleted')
            .sort({ [sort.field]: sort.order === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
        Todo.countDocuments(query)
    ]);
    
    return {
        data: todos.map((todo): TodoResponse => ({
            _id: todo._id.toString(),
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            isCompleted: todo.isCompleted
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
}

export const toggleComplete = async (todoId: string, userId: string): Promise<TodoResponse | null> => {
    logger.info(`TodoService.toggleComplete\nParams: ${todoId} ${userId}`);
    
    const todo = await Todo.findOne({ _id: todoId, user: userId, isDeleted: false })
        .select('_id title description dueDate isCompleted')
        .exec();

    if (!todo) return null;

    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    return {
        _id: todo._id.toString(),
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        isCompleted: todo.isCompleted
    };
}

export const completeDueTodos = async (): Promise<number> => {
    logger.info(`TodoService.completeDueTodos`);
    try {
        const result = await Todo.updateMany({
            dueDate: { $lt: new Date() },
            isDeleted: false,
            isCompleted: false
        }, {
            $set: {
                isCompleted: true
            }
        });
        
        return result.modifiedCount;
    } catch (error) {
        console.error('Error completing due todos:', error);
        throw error;
    }
}