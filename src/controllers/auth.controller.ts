import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UserDto from 'src/dto/user.dto';
import UserService from '../services/user.srvc';

class AuthController {
  async signup(req: Request, resp: Response) {
    try {
      const user = await UserService.createUser(req.body);
      const token = this.createToken(user);
      resp.status(200).send({ token });
    } catch (error) {
      console.log(error);
      resp.status(400).send({ error: error.detail });
    }
  }

  async login(req: Request, resp: Response) {
    try {
      const user = await UserService.findUser(req.body);
      if (user) {
        const token = this.createToken(user);
        resp.status(200).send({ token });
      } else {
        throw new Error('Incorrect email');
      }
    } catch (error) {
      const err = error.message || error.detail;
      console.log(error);
      resp.status(400).send({ error: err });
    }
  }

  private createToken(user: UserDto) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }
}

export default new AuthController();