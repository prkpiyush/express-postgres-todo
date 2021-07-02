"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const todo_entity_1 = require("../entities/todo.entity");
class TodoService {
    async createTodo(todo) {
        const todoRepository = typeorm_1.getRepository(todo_entity_1.Todo);
        return todoRepository.save(todo);
    }
    async getAllTodos() {
        const todoRepository = typeorm_1.getRepository(todo_entity_1.Todo);
        return todoRepository.find();
    }
    async searchTodos(searchString) {
        const todoRepository = typeorm_1.getRepository(todo_entity_1.Todo);
        return todoRepository.find({
            where: [
                { title: typeorm_1.ILike(`%${searchString}%`) },
                { description: typeorm_1.ILike(`%${searchString}%`) }
            ]
        });
    }
    async updateTodo(todo) {
        const todoRepository = typeorm_1.getRepository(todo_entity_1.Todo);
        await todoRepository.update(todo.id, todo);
        return todoRepository.findOne(todo.id);
    }
    async deleteTodo(id) {
        const todoRepository = typeorm_1.getRepository(todo_entity_1.Todo);
        return await todoRepository.delete({ id });
    }
}
exports.default = new TodoService();
//# sourceMappingURL=todo.srvc.js.map