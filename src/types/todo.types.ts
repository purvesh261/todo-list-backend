export interface TodoResponse {
    _id: string,
    title: string;
    description?: string;
    dueDate: Date;
    isCompleted: boolean;
    user?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface TodoFilters {
    isCompleted?: boolean;
    dueDateFrom?: Date;
    dueDateTo?: Date;
    createdAtFrom?: Date;
    createdAtTo?: Date;
    search?: string;
}

export interface TodoSort {
    field: 'title' | 'dueDate' | 'isCompleted' | 'createdAt';
    order: 'asc' | 'desc';
}

export interface GetTodosParams {
    page?: number;
    limit?: number;
    filters?: TodoFilters;
    sort?: TodoSort;
} 