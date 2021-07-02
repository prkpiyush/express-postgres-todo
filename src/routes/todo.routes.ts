import { Router } from "express";
import TodoController from "../controllers/todo.controller";

const TodoRouter = Router();

TodoRouter.post('/create', TodoController.create);
TodoRouter.post('/update', TodoController.update);
TodoRouter.get('/get-all', TodoController.getAll);
TodoRouter.post('/search', TodoController.search);
TodoRouter.delete('/delete/:id', TodoController.delete);

export { TodoRouter };
