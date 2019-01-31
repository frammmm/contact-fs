export class OperationResult {
    public code: number;
    public error: boolean;
    public description?: string;

    constructor(code: number = 200, error: boolean = false, description?: string) {
        this.code = code;
        this.error = error;
        this.description = description;
    }
}