import { getRepository, ILike } from 'typeorm';

import UserDto from 'src/dto/user.dto';
import TodoDTO from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';

class TodoService {
  async createTodo(todo: TodoDTO): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    return todoRepository.save(todo);
  }

  async getAllTodos(user: UserDto): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    return todoRepository.find({ where: { user } });
  }

  async searchTodos(searchString: string, user: UserDto): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    return todoRepository.find({
      where: [
        { user },
        { title: ILike(`%${searchString}%`) },
        { description: ILike(`%${searchString}%`) }]
    });
  }

  async updateTodo(todo: TodoDTO, user: UserDto): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    const todoInDB = await todoRepository.findOne(todo.id, { where: { user } });
    if (todoInDB) {
      const updatedTodo = { ...todoInDB, ...todo, user };
      return await todoRepository.save(updatedTodo);
    }

    return null;
  }

  async deleteTodo(id: number, user: UserDto): Promise<{}> {
    const todoRepository = getRepository(Todo);
    return await todoRepository.delete({ id, user });
  }
}

export default new TodoService();