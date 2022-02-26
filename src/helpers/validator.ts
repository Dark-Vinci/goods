import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

import resp from "../helpers/response";

type validateReturn = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
type validateFunc = Promise<void | Response<any, Record<string, any>>>

class Validator {
    public validate (schema: AnySchema): validateReturn  {
        return async (req: Request, res: Response, next: NextFunction): validateFunc => {
            try {
                await schema.validate({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
        
                return next();
            } catch (error: any) {
                const response = resp.errorResponse(400, "error", { error: error.message });
    
                return res.status(400).json(response);
            }
        }
    }

    public static create () {
        return new Validator();
    }
}

export default Validator.create();