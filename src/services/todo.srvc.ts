import { getRepository, ILike } from 'typeorm';

import TodoDTO from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import redisWrapper from '../helpers/redisWrapper';

class TodoService {
  async createTodo(todo: TodoDTO, user: User): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const todoData: Todo = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isComplete: todo.isComplete,
      user,
    };
    return todoRepository.save(todoData);
  }

  async getAllTodos(user: User): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    const todos = await todoRepository.find({
      where: { user },
      cache: 10000,
    });
    return todos;
  }

  async searchTodos(searchString: string, user: User): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    return todoRepository.find({
      where: [
        { user },
        { title: ILike(`%${searchString}%`) },
        { description: ILike(`%${searchString}%`) },
      ],
    });
  }

  async updateTodo(todo: TodoDTO, user: User): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const todoInDB = await todoRepository.findOne(todo.id, { where: { user } });
    if (todoInDB) {
      const updatedTodo: Todo = {
        id: todo.id || todoInDB.id,
        title: todo.title || todoInDB.title,
        description: todo.description || todoInDB.description,
        isComplete: todo.isComplete || todoInDB.isComplete,
        user,
      };
      return await todoRepository.save(updatedTodo);
    }

    return null;
  }

  async deleteTodo(id: number, user: User): Promise<{}> {
    const todoRepository = getRepository(Todo);
    return await todoRepository.delete({ id, user });
  }
}

export default new TodoService();
