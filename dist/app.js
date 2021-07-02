"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const todo_routes_1 = require("./routes/todo.routes");
require('dotenv').config();
var logger = function (req, res, next) {
    console.log(`Received request for ${req.path}`);
    next();
};
typeorm_1.createConnection()
    .then(connection => {
    const app = express_1.default();
    app.set('port', process.env.PORT || 4000);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(logger);
    app.use('/todos', todo_routes_1.TodoRouter);
    app.get('/', (req, resp) => {
        resp.send('Hello World');
    });
    app.listen(app.get('port'), () => {
        console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
        console.log('Press CTRL-C to stop\n');
    });
})
    .catch(err => console.log('Error in creating typeORM connection', err));
//# sourceMappingURL=app.js.map