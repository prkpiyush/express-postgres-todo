import { NextFunction, Request, Response } from 'express';

import { NotFound } from '../helpers/error';
import { RequestWithUser } from 'src/interfaces/requestWithUser';
import { ApiResponse } from '../helpers/responseHandler';
import TodoService from '../services/todo.srvc';

class TodoController {
  create = async (req: RequestWithUser, resp: Response, next: NextFunction) => {
    try {
      const todo = await TodoService.createTodo(req.body, req.user);
      resp
        .status(200)
        .json(ApiResponse('Todo created', resp.statusCode, 'success', todo));
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: RequestWithUser, resp: Response, next: NextFunction) => {
    try {
      const todos = await TodoService.getAllTodos(req.user);
      if (todos.length) {
        resp
          .status(200)
          .json(ApiResponse('All todos', resp.statusCode, 'success', todos));
      } else {
        resp
          .status(200)
          .json(ApiResponse('No todos found', resp.statusCode, 'success', []));
      }
    } catch (error) {
      next(error);
    }
  };

  search = async (req: RequestWithUser, resp: Response, next: NextFunction) => {
    try {
      const todos = await TodoService.searchTodos(req.body.search, req.user);
      if (todos.length) {
        resp
          .status(200)
          .json(ApiResponse('Found todos', resp.statusCode, 'success', todos));
      } else {
        resp
          .status(200)
          .json(ApiResponse('No todos found', resp.statusCode, 'success', []));
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (req: RequestWithUser, resp: Response, next: NextFunction) => {
    try {
      const todo = await TodoService.updateTodo(req.body, req.user);
      if (todo) {
        resp
          .status(200)
          .json(ApiResponse('Updated todo', resp.statusCode, 'success', todo));
      } else {
        throw new NotFound('Todo not found');
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: RequestWithUser, resp: Response, next: NextFunction) => {
    try {
      const todoId = parseInt(req.params.id, 10);
      await TodoService.deleteTodo(todoId, req.user);
      resp
        .status(200)
        .json(ApiResponse('Deleted todo', resp.statusCode, 'success', {}));
    } catch (error) {
      next(error);
    }
  };
}

export default new TodoController();
