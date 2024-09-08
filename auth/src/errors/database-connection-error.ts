export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database";
  constructor() {
    super();

    // only in TS as we are extending something
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
