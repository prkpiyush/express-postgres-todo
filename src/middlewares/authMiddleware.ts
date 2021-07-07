import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { User } from 'src/entities/user.entity';
import { BadRequest, Unauthorized } from '../helpers/error';
import { RequestWithUser } from 'src/interfaces/requestWithUser';

export const requireAuth = (
  req: RequestWithUser,
  resp: Response,
  next: NextFunction,
) => {
  const token = getToken(req);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        throw new BadRequest(err.message);
      } else {
        req.user = {
          id: decodedToken.userId,
          email: decodedToken.email,
        } as User;
        next();
      }
    });
  } else {
    throw new Unauthorized('User unauthorised');
  }
};

function getToken(request: Request) {
  const tokenHeader =
    request.headers.Authorization || request.headers.authorization;

  if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
    return (tokenHeader as string).split(' ')[1];
  }

  return null;
}
