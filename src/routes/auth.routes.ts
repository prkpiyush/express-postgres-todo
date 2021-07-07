import { Router } from 'express';
import { schemaValidator } from '../middlewares/schemaValidator';
import { createUserSchema } from '../schema/user.schema';
import AuthController from '../controllers/auth.controller';

const AuthRouter = Router();

AuthRouter.post(
  '/signup',
  schemaValidator(createUserSchema, 'body'),
  AuthController.signup,
);

AuthRouter.post(
  '/login',
  schemaValidator(createUserSchema, 'body'),
  AuthController.login,
);

export { AuthRouter };
