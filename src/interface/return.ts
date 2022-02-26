

interface okResponse {
    status: number;
    data: object;
    message: string;
}

interface errorResponse {
    status: number;
    error: object;
    message: string;
}

export { okResponse, errorResponse };