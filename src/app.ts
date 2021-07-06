import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { handleErrors } from './middlewares/errorMiddleware';
import { logger } from './middlewares/logger';
import { AuthRouter } from './routes/auth.routes';

import { TodoRouter } from './routes/todo.routes';

require('dotenv').config();
require('reflect-metadata');

createConnection()
  .then(connection => {
    // Create Express server
    const app = express();

    // Express configuration
    app.set('port', process.env.PORT || 4000);

    // Setup middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Add routes
    app.use('/todos', TodoRouter);
    app.use('/auth', AuthRouter);
    app.get('/', (req: Request, resp: Response) => {
      resp.send('Hello World')
    });

    // Error middleware
    app.use(handleErrors);

    // Start the server
    app.listen(app.get('port'), () => {
      logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode')`);
      logger.info('Press CTRL-C to stop\n');
    });
  })
  .catch(err => logger.error('Error in creating typeORM connection', err));
