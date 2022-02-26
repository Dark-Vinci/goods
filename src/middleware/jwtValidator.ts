import jwt from "jsonwebtoken";
import config from "config";
import { 
    Request, 
    Response, 
    NextFunction 
} from "express";

import resp from "../helpers/response";

class JWTValidator {
    public static create () {
        return new JWTValidator();
    }

    public validate (req: Request, res: Response, next: NextFunction) {
        const token = req.header("x-auth-token") as string;
    
        if (!token) {
            const response = resp.errorResponse(401, "forbidden", { error: "no token has been provided" });
    
            return res.status(401).json(response);
        } 
    
        try {
            const decoded = jwt.verify(token, config.get("jwtKey"));
    
            // @ts-ignore
            req.user = decoded;
    
            next();
        } catch (ex) {
            const response = resp.errorResponse(400, "invalid token", { error: "authorization token provided is invalid" });
            return res.status(401).json(response);
        }
    }
}

export default JWTValidator.create();