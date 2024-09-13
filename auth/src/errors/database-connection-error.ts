import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 400;
  reason = "Error connecting to database";
  constructor() {
    super("Error in database connection");

    // only in TS as we are extending something
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializedErrors() {
    return [{ message: this.reason }];
  }
}
