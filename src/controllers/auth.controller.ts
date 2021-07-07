import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import UserDto from 'src/dto/user.dto';
import { BadRequest } from '../helpers/error';
import { ApiResponse } from '../helpers/ResponseHandler';
import UserService from '../services/user.srvc';

class AuthController {
  signup = async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const user = await UserService.createUser(req.body);
      const data = {
        token: this.createToken(user),
        user: { email: user.email, id: user.id },
      };
      resp
        .status(200)
        .json(
          ApiResponse('Signup successful', resp.statusCode, 'success', data),
        );
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, resp: Response, next: NextFunction) => {
    try {
      const user = await UserService.findUser(req.body);
      if (user) {
        const data = {
          token: this.createToken(user),
          user: { email: user.email, id: user.id },
        };
        resp
          .status(200)
          .json(
            ApiResponse('Login successful', resp.statusCode, 'success', data),
          );
      } else {
        throw new BadRequest('Incorrect email');
      }
    } catch (error) {
      next(error);
    }
  };

  private createToken(user: UserDto) {
    return jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );
  }
}

export default new AuthController();
