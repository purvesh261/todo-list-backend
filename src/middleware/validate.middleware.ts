import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = (schema: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        await Promise.all(schema.map(validation => validation.run(req)));
        console.log(req.params, "query")
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().reduce((acc: Record<string, string>, error) => {
                acc[error.type === 'field' ? error.path : ''] = error.msg;
                return acc;
            }, {});
            
            res.status(400).json({ message: "Validation Error", errors: formattedErrors });
            return;
        }
        next();
    };
}; 