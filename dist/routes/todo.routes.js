"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const TodoRouter = express_1.Router();
exports.TodoRouter = TodoRouter;
TodoRouter.post('/create', todo_controller_1.default.create);
TodoRouter.post('/update', todo_controller_1.default.update);
TodoRouter.get('/get-all', todo_controller_1.default.getAll);
TodoRouter.post('/search', todo_controller_1.default.search);
TodoRouter.delete('/delete/:id', todo_controller_1.default.delete);
//# sourceMappingURL=todo.routes.js.map