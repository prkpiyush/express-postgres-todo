"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_srvc_1 = __importDefault(require("../service/todo.srvc"));
class TodoController {
    async create(req, resp) {
        try {
            const todo = await todo_srvc_1.default.createTodo(req.body);
            resp.status(200).send(todo);
        }
        catch (error) {
            resp.send({
                msg: 'Unable to create todo',
                status: 404
            });
        }
    }
    async getAll(req, resp) {
        try {
            const todos = await todo_srvc_1.default.getAllTodos();
            resp.status(200).send(todos);
        }
        catch (error) {
            resp.send({
                msg: 'No todos found',
                status: 404
            });
        }
    }
    async search(req, resp) {
        try {
            const todos = await todo_srvc_1.default.searchTodos(req.body.search);
            resp.status(200).send(todos);
        }
        catch (error) {
            resp.send({
                msg: 'No todos found',
                status: 404
            });
        }
    }
    async update(req, resp) {
        try {
            const todo = await todo_srvc_1.default.updateTodo(req.body);
            resp.status(200).send(todo);
        }
        catch (error) {
            resp.send({
                msg: 'Unable to update todo',
                status: 404
            });
        }
    }
    async delete(req, resp) {
        try {
            await todo_srvc_1.default.deleteTodo(req.params.id);
            resp.status(200).send({});
        }
        catch (error) {
            resp.send({
                msg: 'Todo not found',
                status: 404
            });
        }
    }
}
exports.default = new TodoController();
//# sourceMappingURL=todo.controller.js.map