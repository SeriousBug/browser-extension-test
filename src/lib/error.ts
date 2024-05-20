export class SError<T = unknown> extends Error {
  private data?: T;

  constructor({ message, data }: { message: string; data?: T }) {
    super(message);
    this.name = "SError";
    this.data = data;
  }
}

export class SShadowError extends SError<{ target: Element }> {
  constructor({
    message,
    data,
  }: {
    message: string;
    data?: { target: Element };
  }) {
    super({ message, data });
    this.name = "SShadowError";
  }
}
