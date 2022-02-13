import jwt from "jsonwebtoken";
import config from "config";
import { Request, Response, NextFunction } from "express";

import responseHelper from "../helpers/response";

function jwtValidator (req: Request, res: Response, next: NextFunction) {
    const token = req.header("x-auth-token");

    if (!token) {
        const response = responseHelper(401, "forbidden", null, { error: "no token has been provided" });
        res.status(401).json(response);
        return;
    } 

    try {
        const decoded = jwt.verify(token, config.get("jwtKey"));

        // @ts-ignore
        req.user = decoded;

        next();
    } catch (ex) {
        const response = responseHelper(400, "invalid token", null, { error: "authorization token provided is invalid" });
        res.status(401).json(response);
        return;
    }
}

export default jwtValidator;