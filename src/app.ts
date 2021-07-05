import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { AuthRouter } from './routes/auth.routes';

import { TodoRouter } from './routes/todo.routes';

require('dotenv').config();
require('reflect-metadata');

var logger = function (req: Request, res: Response, next: NextFunction) {
  console.log(`Received request for ${req.path}`);
  next(); // Passing the request to the next handler in the stack.
}

createConnection()
  .then(connection => {
    // Create Express server
    const app = express();

    // Express configuration
    app.set('port', process.env.PORT || 4000);

    // Setup middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger);

    // Add routes
    app.use('/todos', TodoRouter);
    app.use('/auth', AuthRouter);
    app.get('/', (req: Request, resp: Response) => {
      resp.send('Hello World')
    });

    // Start the server
    app.listen(app.get('port'), () => {
      console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
      console.log('Press CTRL-C to stop\n');
    });
  })
  .catch(err => console.log('Error in creating typeORM connection', err));
