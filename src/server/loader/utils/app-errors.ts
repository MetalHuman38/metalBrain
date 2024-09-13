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

// ** App Specic Errors ** //

// ** Invalid Password Error ** //
export class InvalidPasswordError extends AppError {
  constructor() {
    super(
      "Invalid Credentials! Check the email or password",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Authentication Error",
      "Invalid email or password"
    );
  }
}

// ** Password Validation Error ** //
export class PasswordValidationError extends AppError {
  constructor() {
    super(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Password Validation Error",
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character."
    );
  }
}

// ** Password Length Error ** //
export class PasswordLengthError extends AppError {
  constructor() {
    super(
      "Password must be at least 8 characters long",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Password Length Error",
      "Password must be at least 8 characters long"
    );
  }
}

// ** Login Error ** //
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
      "WARNING!!Unauthorized attempt to backend. You do not have the required permissions",
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

// ** Method Not Allowed Error ** //
export class MethodNotAllowedError extends AppError {
  constructor() {
    super(
      "WARNING!! Invalid method! Check the request method",
      STATUS_CODES.METHOD_NOT_ALLOWED,
      true,
      "Method Not Allowed",
      "WARNING!! Invalid method! Check the request method"
    );
  }
}

// ** Conflict Error ** //
export class EmailAlreadyInUse extends AppError {
  constructor() {
    super(
      "The email you are trying to use is already in use",
      STATUS_CODES.CONFLICT,
      true,
      "Conflict",
      "The email you are trying to use is already in use"
    );
  }
}

// ** Internal Server Error ** //
export class InternalServerError extends AppError {
  constructor() {
    super(
      "InternalServerError! Something went wrong!",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      "Internal Server Error",
      "InternalServerError! Something went wrong!"
    );
  }
}

// ** User Not Found Error ** //
export class UserNotFoundError extends AppError {
  constructor() {
    super(
      "UserNotFoundError! User not found! Check expectded user details, id, role, and token",
      STATUS_CODES.NOT_FOUND,
      true,
      "User Not Found! Check the user id",
      "User not found! Check expectded user details, id, role, and token"
    );
  }
}

// ** Admin Not Found Error ** //
export class AdminNotFoundError extends AppError {
  constructor() {
    super(
      "AdminNotFoundError! Access denied! Not able to perform this action",
      STATUS_CODES.NOT_FOUND,
      true,
      "Admin Not Found! Check the admin id",
      "Admin not found! Check expectded admin details, id, role, and token"
    );
  }
}

// ** Error promoting user to superadmin ** //
export class ErrorPromotingUserToSuperAdmin extends AppError {
  constructor() {
    super(
      "ErrorPromotingUserToSuperAdmin! Error promoting user! Check the user details",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Error Promoting User To Super Admin",
      "Error promoting user to superadmin! Check the user details"
    );
  }
}

// ** AdminOnly Error ** //
export class SuperAdminOnlyError extends AppError {
  constructor() {
    super(
      "AdminOnlyError! Access denied! Not able to perform this action",
      STATUS_CODES.FORBIDDEN,
      true,
      "Admin Only Error",
      "Access denied! Not able to perform this action"
    );
  }
}

// ** Error! User with Id not found ** //
export class UserWithIdNotFoundError extends AppError {
  constructor() {
    super(
      "UserWithIdNotFoundError! User with Id not found! Check the user id",
      STATUS_CODES.NOT_FOUND,
      true,
      "User With Id Not Found",
      "User with Id not found! Check the user id"
    );
  }
}

// ** Token Error ** //
export class TokenError extends AppError {
  constructor() {
    super(
      "TokenError! Invalid token! Check the token",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Token Error",
      "Invalid token! Check the token"
    );
  }
}

// ** Error Creating User ** //
export class ErrorCreatingUser extends AppError {
  constructor() {
    super(
      "ErrorCreatingUser! Error creating user! Check the user details",
      STATUS_CODES.BAD_REQUEST,
      true,
      "Error Creating User",
      "Error creating user! Check the user details"
    );
  }
}

// ** No refresh Toke found ** //
export class NoRefreshTokenError extends AppError {
  constructor() {
    super(
      "NoRefreshTokenError! No refresh token found! Check the token",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      "No Refresh Token Error",
      "No refresh token found! Check the token"
    );
  }
}

// ** Error refreshing token ** //
export class ErrorRefreshingToken extends AppError {
  constructor() {
    super(
      "ErrorRefreshingToken! Error refreshing token! Check the token",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      "Error Refreshing Token",
      "Error refreshing token! Check the token"
    );
  }
}

// ** Error Verifying Token ** //
export class ErrorVerifyingToken extends AppError {
  constructor() {
    super(
      "ErrorVerifyingToken! Error verifying token!",
      STATUS_CODES.UNAUTHORIZED,
      true,
      "Error Verifying Token",
      "Error verifying token! Check the token"
    );
  }
}

// ** Error Decoding Token ** //
export class ErrorDecodingToken extends AppError {
  constructor() {
    super(
      "ErrorDecodingToken! Error decoding token! Check the token",
      STATUS_CODES.UNAUTHORIZED,
      true,
      "Error Decoding Token",
      "Error decoding token! Check the token"
    );
  }
}

// ** Error generating token ** //
export class ErrorGeneratingToken extends AppError {
  constructor() {
    super(
      "ErrorGeneratingToken! Error generating token! Check the token method",
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      true,
      "Error Generating Token",
      "Error generating token! Check the token"
    );
  }
}

// ** No Token found ** //
export class NoTokenError extends AppError {
  constructor() {
    super(
      "NoTokenError! No token found! Check the token",
      STATUS_CODES.UNAUTHORIZED,
      true,
      "No Token Error",
      "No token found! Check the token"
    );
  }
}

export default AppError;
