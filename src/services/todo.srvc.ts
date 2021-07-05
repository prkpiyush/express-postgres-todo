import UserDto from 'src/dto/user.dto';
import { getRepository, ILike } from 'typeorm';
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
    await todoRepository.update(todo.id, todo);
    return todoRepository.findOne(todo.id, { where: { user }});
  }

  async deleteTodo(id: number, user: UserDto): Promise<{}> {
    const todoRepository = getRepository(Todo);
    return await todoRepository.delete({ id, user });
  }
}

export default new TodoService();