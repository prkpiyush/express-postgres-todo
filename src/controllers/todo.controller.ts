import { Request, Response } from 'express';
import TodoService from '../services/todo.srvc';

class TodoController {
  async create(req: Request, resp: Response) {
    try {
      const todo = await TodoService.createTodo(req.body);
      resp.status(200).send(todo);
    } catch (error) {
      resp.status(400).send('Unable to create todo');
    }
  }

  async getAll(req: Request, resp: Response) {
    try {
      const todos = await TodoService.getAllTodos();
      resp.status(200).send(todos);
    } catch (error) {
      resp.status(404).send('');
    }
  }

  async search(req: Request, resp: Response) {
    try {
      const todos = await TodoService.searchTodos(req.body.search);
      resp.status(200).send(todos);
    } catch (error) {
      resp.status(404).send('No todos found');
    }
  }

  async update(req: Request, resp: Response) {
    try {
      const todo = await TodoService.updateTodo(req.body);
      resp.status(200).send(todo);
    } catch (error) {
      resp.status(404).send('Todo not found');
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      await TodoService.deleteTodo(req.params.id);
      resp.status(200).send({});
    } catch (error) {
      resp.status(404).send('Todo not found');
    }
  }
}

export default new TodoController();