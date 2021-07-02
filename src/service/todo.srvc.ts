import { getRepository, ILike } from 'typeorm';
import TodoDTO from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';

class TodoService {
  async createTodo(todo: TodoDTO): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    return todoRepository.save(todo);
  }

  async getAllTodos(): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    return todoRepository.find();
  }

  async searchTodos(searchString: string): Promise<Todo[]> {
    const todoRepository = getRepository(Todo);
    return todoRepository.find({
      where: [
        { title: ILike(`%${searchString}%`) },
        { description: ILike(`%${searchString}%`) }]
    });
  }

  async updateTodo(todo: TodoDTO): Promise<Todo> {
    const todoRepository = getRepository(Todo);
    await todoRepository.update(todo.id, todo);
    return todoRepository.findOne(todo.id);
  }

  async deleteTodo(id: string): Promise<{}> {
    const todoRepository = getRepository(Todo);
    return await todoRepository.delete({ id });
  }
}

export default new TodoService();