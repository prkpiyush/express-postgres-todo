import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const requireAuth = (req: Request, resp: Response, next: NextFunction) => {
  const token = getToken(req);

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        throw new Error(err.message);
      } else {
        next();
      }
    });
  } else {
    resp.status(401).send('Unauthorised user');
  }
};

function getToken(request: Request) {
  const tokenHeader = request.headers.Authorization || request.headers.authorization;

  if (tokenHeader && (tokenHeader as string).split(' ')[0] === 'Bearer') {
    return (tokenHeader as string).split(' ')[1];
  }

  return null;
}