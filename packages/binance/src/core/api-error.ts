export class APIError extends Error {
  constructor(message: string) {
    super(`API request failed: ${message}`);
    this.name = 'APIError';
  }
}
