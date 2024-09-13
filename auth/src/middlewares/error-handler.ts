import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

/**
 *
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns {errors: {message:string, filed?:string }[]}
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Something went wrong");
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializedErrors() });
  }

  res.status(400).send({ errors: [{ message: err.message }] });
};
