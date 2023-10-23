class CustomError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    status: string = 'error',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.isOperational = isOperational;

    // Capture the stack trace, excluding the constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
