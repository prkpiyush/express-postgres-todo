import { Request, Response } from 'express';
declare class TodoController {
    create(req: Request, resp: Response): Promise<void>;
    getAll(req: Request, resp: Response): Promise<void>;
    search(req: Request, resp: Response): Promise<void>;
    update(req: Request, resp: Response): Promise<void>;
    delete(req: Request, resp: Response): Promise<void>;
}
declare const _default: TodoController;
export default _default;
