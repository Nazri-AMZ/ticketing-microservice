import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Routes not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializedErrors() {
    return [{ message: this.message }];
  }
}
