import { 
    Request, 
    Response, 
    NextFunction 
} from "express";
import winston from "winston";

import resp from "../helpers/response";

class ErrorMiddleware {
    public static create () {
        return new ErrorMiddleware();
    }

    public init (err: Error, req: Request, res: Response, next: NextFunction) {
        winston.error(err);
    
        const response = resp.errorResponse(500, "internal server error", err);
    
        return res.status(500).json(response);
    }
}

export default ErrorMiddleware.create();