import ResponseInterface from "../interface/return";

function response(status: number, message: string, data: object | null, error: object | null): ResponseInterface {
    const responseData = {
        status: status,
        message: message,
        data: data,
        error: error,
    }

    return responseData
}

export default response;