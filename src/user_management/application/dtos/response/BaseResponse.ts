export class BaseResponse {
    data: any;
    message: string;
    success: boolean;

    constructor(data: any, message: string, success: boolean) {
        this.data = data;
        this.message = message;
        this.success = success;
    }
}