// errors/AppError.ts
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

export class AppError extends Error {
  name: string;
  statusCode: number;
  isOperational: boolean;
  errorStack: string;
  userMessage: string;
  context?: string;

  constructor(
    name: string,
    statusCode: number,
    description: string,
    isOperational: boolean,
    errorStack: string,
    userMessage: string,
    context?: string
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype); // Restore the prototype chain
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.userMessage = userMessage; // Message to show to users
    this.context = context;
    Error.captureStackTrace(this);
  }
}

// ** App Specic Errors ** //

// **  Bad Request Error ** //
export class BadRequestError extends AppError {
  constructor(description: string) {
    super(
      "BadRequestError",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      "Bad Request",
      "Invalid request in the body! Check the request body",
      "Context Error"
    );
  }
}

// ** Invalid Password Error ** //
export class InvalidPasswordError extends AppError {
  constructor(description: string) {
    super(
      "InvalidPasswordError",
      STATUS_CODES.BAD_REQUEST,
      description,
      true,
      "Invalid Password",
      "Invalid credentials! Incorrect email or password",
      "Context Error"
    );
  }
}

// ** Axios Error ** //
export class IAxiosError extends AppError {
  constructor(description: string) {
    super(
      "IAxiosError",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      description,
      true,
      "Axios Error",
      "Internal Server Error! Something went wrong",
      "Context Error"
    );
  }
}

// ** Undefined Error ** //
export class IUndefinedError extends AppError {
  constructor(description: string) {
    super(
      "IUndefinedError",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      description,
      true,
      "Undefined Error",
      "Internal Server Error! Something went wrong",
      "Context Error"
    );
  }
}

// ** Email Exists Error ** //
export class EmailExistsError extends AppError {
  constructor(description: string) {
    super(
      "EmailExistsError",
      STATUS_CODES.CONFLICT,
      description,
      true,
      "Email Exists",
      "Email already exists! Try another email",
      "Context Error"
    );
  }
}

// ** Unauthorized Access Error ** //
export class UnauthorizedAccessError extends AppError {
  constructor(description: string) {
    super(
      "UnauthorizedAccessError",
      STATUS_CODES.UNAUTHORIZED,
      description,
      true,
      "Unauthorized Access",
      "Unauthorized access! Invalid email or password",
      "Context Error"
    );
  }
}

// ** Unable to verify user ** //
export class UnableToVerifyUser extends AppError {
  constructor(description: string) {
    super(
      "UnableToVerifyUser",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      description,
      true,
      "Unable to verify user",
      "Unable to verify user! Something went wrong",
      "Context Error"
    );
  }
}
