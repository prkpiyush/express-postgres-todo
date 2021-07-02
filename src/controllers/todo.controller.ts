import { Request, Response } from 'express';
import TodoService from '../service/todo.srvc';

class TodoController {
  async create(req: Request, resp: Response) {
    try {
      const todo = await TodoService.createTodo(req.body);
      resp.status(200).send(todo);
    } catch (error) {
      resp.send({
        msg: 'Unable to create todo',
        status: 404
      });
    }
  }

  async getAll(req: Request, resp: Response) {
    try {
      const todos = await TodoService.getAllTodos();
      resp.status(200).send(todos);
    } catch (error) {
      resp.send({
        msg: 'No todos found',
        status: 404
      });
    }
  }

  async search(req: Request, resp: Response) {
    try {
      const todos = await TodoService.searchTodos(req.body.search);
      resp.status(200).send(todos);
    } catch (error) {
      resp.send({
        msg: 'No todos found',
        status: 404
      });
    }
  }

  async update(req: Request, resp: Response) {
    try {
      const todo = await TodoService.updateTodo(req.body);
      resp.status(200).send(todo);
    } catch (error) {
      resp.send({
        msg: 'Unable to update todo',
        status: 404
      });
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      await TodoService.deleteTodo(req.params.id);
      resp.status(200).send({});
    } catch (error) {
      resp.send({
        msg: 'Todo not found',
        status: 404
      });
    }
  }
}

export default new TodoController();