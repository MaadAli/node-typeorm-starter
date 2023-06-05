import express from 'express';

const STATUS_CODES = {
  SUCCESS: 200,
  FAILURE: 400,
  UNIQUE: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

type body = {
  status: string;
  message: string;
  details: any;
};

export class HttpError extends Error {
  errorResp: body;
  status: number;
  constructor(status = 500, message = 'Internal Server Error', details = null) {
    super();
    this.status = status;
    this.errorResp = {
      status: 'ERROR',
      message,
      details,
    };
  }
}

export class BadRequestError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details: any | undefined) {
    super(STATUS_CODES.FAILURE, message, details);
    this.message = message;
    this.details = details;
  }
}

export class FailureError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details: any | undefined) {
    super(STATUS_CODES.FAILURE, message, details);
    this.message = message;
    this.details = details;
  }
}

export class ConflictError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details: any | undefined) {
    super(STATUS_CODES.UNIQUE, message, details);
    this.message = message;
    this.details = details;
  }
}

export class UnAuthorizedError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details: any | undefined) {
    super(STATUS_CODES.UNAUTHORIZED, message, details);
    this.message = message;
    this.details = details;
  }
}

export class ForbiddenError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details = null) {
    super(STATUS_CODES.FORBIDDEN, message, details);
    this.message = message;
    this.details = details;
  }
}

export class NotFoundError extends HttpError {
  message: string;
  details: any;
  constructor(message = '', details: any | undefined) {
    super(STATUS_CODES.UNIQUE, message, details);
    this.message = message;
    this.details = details;
  }
}

export class ApiResponse {
  res: express.Response;
  // body: body;
  constructor(
    res: any
  ) {
    this.res = res;
  }
  public build(message = '', details: any | null) {
    return this.res.status(STATUS_CODES.SUCCESS).json({
      status: 'SUCCESS',
      message,
      details,
    });
  }
}
