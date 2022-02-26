import xss from "xss-clean";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Express } from "express";
import morgan from "morgan";
import express from "express";

import errorHandler from "../middleware/error";
import userRouter from "../router/user";
import adminRouter from "../router/admin";
import goodRouter from "../router/goods";
import homeRouter from "../router/home";
import sessionRouter from "../router/session";

class Route {
    public static create () {
        return new Route();
    }

    public init (app: Express): void {
        app.use(xss());
        app.use(helmet());
        app.use(cors({ origin: "*" }));
        app.use(compression());
        app.use(morgan("tiny"));
    
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // app.use(express.)

        // * corrected
        app.use("/api/users", userRouter);
        app.use("/api/goods", goodRouter);
        app.use("/api/session", sessionRouter);
        app.use("/api/home", homeRouter);
        app.use("/api/admin", adminRouter);
    
        app.use(errorHandler.init);
    }
}

export default Route.create();