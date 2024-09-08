import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // only in typescript
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
