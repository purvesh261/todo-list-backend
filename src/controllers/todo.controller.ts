import { Request, Response } from "express";
import * as todoService from "../services/todo.service.js";
import { GetTodosParams } from "../types/todo.types.js";
import logger from "../utils/logger.js";

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.createTodo`);
    try {
        const todoData = {
            ...req.body,
            user: req.userId
        };
        const todo = await todoService.createTodo(todoData);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export const getTodos = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.getTodos`);
    const params: GetTodosParams = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        filters: {
            isCompleted: req.query.isCompleted === 'true' ? true : 
                        req.query.isCompleted === 'false' ? false : undefined,
            dueDateFrom: req.query.dueDateFrom ? new Date(req.query.dueDateFrom as string) : undefined,
            dueDateTo: req.query.dueDateTo ? new Date(req.query.dueDateTo as string) : undefined,
            createdAtFrom: req.query.createdAtFrom ? new Date(req.query.createdAtFrom as string) : undefined,
            createdAtTo: req.query.createdAtTo ? new Date(req.query.createdAtTo as string) : undefined,
            search: req.query.search as string
        },
        sort: {
            field: (req.query.sortField as any) || 'createdAt',
            order: (req.query.sortOrder as 'asc' | 'desc') || 'desc'
        }
    };

    const todos = await todoService.getTodos(req.userId as string, params);
    res.json(todos);
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.getTodoById`);
    const todo = await todoService.getTodoById(req.params.id, req.userId as string);
    
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.updateTodo`);
    const todo = await todoService.updateTodo(req.params.id, req.userId as string, req.body);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.deleteTodo`);
    const success = await todoService.deleteTodo(req.params.id, req.userId as string);
    if (!success) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.status(204).send();
};

export const toggleComplete = async (req: Request, res: Response): Promise<void> => {
    logger.info(`TodoController.toggleComplete`);
    const todo = await todoService.toggleComplete(req.params.id, req.userId as string);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
};