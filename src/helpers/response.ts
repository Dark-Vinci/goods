import { okResponse, errorResponse } from "../interface/return";


class Response {
    public errorResponse(status: number, message: string, error: object): errorResponse {
        const response = { status, message, error };

        return response;
    }

    public okResponse(status: number, message: string, data: object): okResponse {
        const response = { status, message, data };

        return response;
    }

    public static create() {
        return new Response();
    }
}

export default Response.create();