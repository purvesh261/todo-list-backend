import { Request, Response } from "express";
import * as todoService from "../services/todo.service.js";
import { GetTodosParams } from "../types/todo.types.js";


export const createTodo = async (req: Request, res: Response) => {
    try {
        const todoData = { ...req.body, user: req.userId };
        const todo = await todoService.createTodo(todoData);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating todo' });
    }
};

export const getTodos = async (req: Request, res: Response) => {
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