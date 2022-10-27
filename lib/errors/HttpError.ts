export class HttpError extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  get StatusCode() {
    return this.statusCode;
  }
}
