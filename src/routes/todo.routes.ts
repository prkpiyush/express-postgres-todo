import { Router } from "express";
import { schemaValidator } from "../middlewares/schema-validator";
import { createTodoSchema, todoDataSchema } from "../schema/todo.schema";
import TodoController from "../controllers/todo.controller";

const TodoRouter = Router();

TodoRouter.post('/create', schemaValidator(createTodoSchema, 'body') , TodoController.create);
TodoRouter.post('/update', schemaValidator(todoDataSchema, 'body'), TodoController.update);
TodoRouter.get('/get-all', TodoController.getAll);
TodoRouter.post('/search', TodoController.search);
TodoRouter.delete('/delete/:id', TodoController.delete);

export { TodoRouter };
