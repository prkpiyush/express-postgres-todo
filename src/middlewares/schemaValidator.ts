import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

export const schemaValidator = (
  schema: Schema,
  property: 'body' | 'query' | 'params',
) => {
  return (req: Request, resp: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      resp.status(422).json({ error: message });
    }
  };
};
