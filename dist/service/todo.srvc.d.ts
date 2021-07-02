import TodoDTO from '../dto/todo.dto';
import { Todo } from '../entities/todo.entity';
declare class TodoService {
    createTodo(todo: TodoDTO): Promise<Todo>;
    getAllTodos(): Promise<Todo[]>;
    searchTodos(searchString: string): Promise<Todo[]>;
    updateTodo(todo: TodoDTO): Promise<Todo>;
    deleteTodo(id: string): Promise<{}>;
}
declare const _default: TodoService;
export default _default;
