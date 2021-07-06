import { GeneralError } from "../helpers/error";
import { ApiResponse } from '../helpers/ResponseHandler';

export const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res
      .status(err.getCode())
      .json(ApiResponse(err.message, err.getCode(), "error"));
  }

  return res
    .status(500)
    .json(ApiResponse(err.message, 500, "error"));
}
