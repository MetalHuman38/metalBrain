const STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  CONTEXT_ERROR: 500,
  INVALID_CREDENTIALS: 401,
};

class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  loginErrorResponse: string;
  context: string;
  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean,
    context: string,
    loginErrorResponse: string
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;
    this.loginErrorResponse = loginErrorResponse;
    Error.captureStackTrace(this, this.constructor);
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      context: this.context,
      loginErrorResponse: this.loginErrorResponse,
    };
  }
}

export class LoginError extends AppError {
  constructor() {
    super(
      "Invalid credentials! Incorrect email or password",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Login Error",
      "Invalid credentials! Incorrect email or password"
    );
  }
}

// ** Invalid Credentials Error ** //
export class InvalidCredentialsError extends AppError {
  constructor() {
    super(
      "Invalid credentials! Incorrect email or password",
      STATUS_CODES.INVALID_CREDENTIALS,
      true,
      "Invalid Credentials",
      "Invalid credentials! Incorrect email or password"
    );
  }
}

export class BadRequestError extends AppError {
  constructor() {
    super(
      "Invalid request in the body! Request may contain invalid fields",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Bad Request",
      "Invalid request in the body! Request may contain invalid fields"
    );
  }
}

// ** unAuthorized Error ** //
export class UnauthorizedError extends AppError {
  constructor() {
    super(
      "WARNING!!Unauthorized attempt. You do not have the required permissions",
      STATUS_CODES.UNAUTHORIZED,
      true,
      "Unauthorized attempt",
      "WARNING!! Unauthorized attempt. You do not have the required permissions"
    );
  }
}

// ** Forbidden Error ** //
export class ForbiddenError extends AppError {
  constructor() {
    super(
      "WARNING!! Access denied! Not able to perform this action",
      STATUS_CODES.FORBIDDEN,
      true,
      "Forbidden",
      "WARNING!! Access denied! Not able to perform this action"
    );
  }
}

// ** Not Found Error ** //
export class NotFoundError extends AppError {
  constructor() {
    super(
      "Resource not found! Do you have the correct URL?",
      STATUS_CODES.NOT_FOUND,
      true,
      "Not Found",
      "Resource not found! Do you have the correct URL?"
    );
  }
}

// ** Error Verifying Token ** //
export class ErrorVerifyingToken extends AppError {
  constructor() {
    super(
      "Error verifying token",
      STATUS_CODES.UNAUTHORIZED,
      true,
      "Error Verifying Token",
      "Error verifying token"
    );
  }
}

// ** Error refreshing token ** //
export class ErrorRefreshingToken extends AppError {
  constructor() {
    super(
      "Error refreshing token",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      "Error Refreshing Token",
      "Error refreshing token"
    );
  }
}
