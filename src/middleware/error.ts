import { Request, Response, NextFunction } from "express";
import winston from "winston";

import response from "../helpers/response";

function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    winston.error(err);

    const resp = response(500, "internal server error", null, err);

    return res.status(500).json(resp);
}

export default errorMiddleware;