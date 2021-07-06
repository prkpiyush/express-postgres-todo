import { Request, Response } from 'express';

import { RequestWithUser } from 'src/interfaces/requestWithInterface';
import TodoService from '../services/todo.srvc';

class TodoController {
  async create(req: RequestWithUser, resp: Response) {
    try {
      const todo = await TodoService.createTodo(req.body, req.user);
      resp.status(200).send(todo);
    } catch (error) {
      console.log(error);
      resp.status(400).send('Unable to create todo');
    }
  }

  async getAll(req: RequestWithUser, resp: Response) {
    try {
      const todos = await TodoService.getAllTodos(req.user);
      resp.status(200).send(todos);
    } catch (error) {
      console.log(error);
      resp.status(404).send('');
    }
  }

  async search(req: RequestWithUser, resp: Response) {
    try {
      const todos = await TodoService.searchTodos(req.body.search, req.user);
      resp.status(200).send(todos);
    } catch (error) {
      console.log(error);
      resp.status(404).send('No todos found');
    }
  }

  async update(req: RequestWithUser, resp: Response) {
    try {
      const todo = await TodoService.updateTodo(req.body, req.user);
      if (todo) {
        resp.status(200).send(todo);
      } else {
        throw new Error('Todo not found');
      }
    } catch (error) {
      console.log(error);
      resp.status(404).send('Cannot update todo');
    }
  }

  async delete(req: RequestWithUser, resp: Response) {
    try {
      const todoId = parseInt(req.params.id, 10);
      await TodoService.deleteTodo(todoId, req.user);
      resp.status(200).send({});
    } catch (error) {
      console.log(error);
      resp.status(404).send('Todo not found');
    }
  }
}

export default new TodoController();