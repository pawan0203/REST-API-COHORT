class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badrequest(message = "Bad request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "unauthrized") {
    return new ApiError(401, message);
  }
  static conflict(message = "conflict- user already exist") {
    return new ApiError(409, message);
  }
  static forbidden(message = "Not verified") {
    return new ApiError(403, message);
  }

  static notfound(message = "Not Found") {
    return new ApiError(404, message);
  }
}

export default ApiError
