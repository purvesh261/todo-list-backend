import Todo, { ITodo } from '../models/todo.model.js';
import { TodoResponse, PaginatedResponse, GetTodosParams } from '../types/todo.types.js';

export const createTodo = async (todoData: Partial<ITodo>): Promise<TodoResponse> => {
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

export const getTodos = async (userId: string, params: GetTodosParams): Promise<PaginatedResponse<TodoResponse>> => {
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