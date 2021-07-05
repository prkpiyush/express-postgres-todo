import { Router } from "express";
import { schemaValidator } from "../middlewares/schema-validator";
import { createUserSchema } from "../schema/user.schema";
import AuthController from "../controllers/auth.controller";

const AuthRouter = Router();

AuthRouter.post(
  '/signup',
  schemaValidator(createUserSchema, 'body'),
  AuthController.signup.bind(AuthController)
);

AuthRouter.post(
  '/login',
  schemaValidator(createUserSchema, 'body'),
  AuthController.login.bind(AuthController)
);

export { AuthRouter };
