export class BadRequestError extends Error {
  readonly statusCode = 400
  readonly name = 'BadRequestError'
}

export class ValidationError extends Error {
  readonly statusCode = 400
  readonly name = 'ValidationError'
}

export class NotFoundError extends Error {
  readonly statusCode = 404
  readonly name = 'NotFoundError'
}