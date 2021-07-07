import { NextFunction, Response, Request } from 'express';
import { GeneralError } from '../helpers/error';
import { ApiResponse } from '../helpers/ResponseHandler';
import { logger } from './logger';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err);

  if (err instanceof GeneralError) {
    return res
      .status(err.getCode())
      .json(ApiResponse(err.message, err.getCode(), 'error'));
  }

  return res.status(500).json(ApiResponse(err.message, 500, 'error'));
};
