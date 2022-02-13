import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

import response from "../helpers/response";

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (error: any) {
        const resp = response(400, "error", null, { error: error.message });
        return res.status(400).json(resp);
    }
}

export default validate;