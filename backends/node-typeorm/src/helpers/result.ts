export class Result {
  public code: number;
  public error: boolean;
  public description?: string;

  constructor(code = 200, error = false, description?: string) {
    this.code = code;
    this.error = error;
    this.description = description;
  }
}
