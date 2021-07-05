import { Router } from "express";
import { schemaValidator } from "../middlewares/schema-validator";
import { createTodoSchema, todoDataSchema } from "../schema/todo.schema";
import TodoController from "../controllers/todo.controller";
import { requireAuth } from "../middlewares/authMiddleware";

const TodoRouter = Router();

TodoRouter.post(
  '/create',
  schemaValidator(createTodoSchema, 'body'),
  requireAuth,
  TodoController.create
);

TodoRouter.post(
  '/update',
  schemaValidator(todoDataSchema, 'body'),
  requireAuth,
  TodoController.update
);

TodoRouter.get(
  '/get-all',
  requireAuth,
  TodoController.getAll
);

TodoRouter.post(
  '/search',
  requireAuth,
  TodoController.search
);

TodoRouter.delete(
  '/delete/:id',
  requireAuth,
  TodoController.delete
);

export { TodoRouter };
