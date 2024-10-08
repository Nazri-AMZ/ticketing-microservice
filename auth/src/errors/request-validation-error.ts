import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid Request Validation Error");

    // only in typescript as we are extending a class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializedErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.type };
    });
  }
}
