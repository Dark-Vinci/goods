import xss from "xss-clean";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Express } from "express";
import morgan from "morgan";
import express from "express";

import errorHandler from "../middleware/error";
import UserRouter from "../router/user";
import AdminRouter from "../router/admin";
import GoodRouter from "../router/goods";
import HomeRouter from "../router/home";
import SessionRouter from "../router/session";

function router(app: Express): void {
    const userRouter = new UserRouter(app);
    const adminRouter = new AdminRouter(app);
    const goodRouter = new UserRouter(app);
    const homeRouter = new AdminRouter(app);
    const sessionRouter = new SessionRouter(app);


    app.use(xss());
    app.use(helmet());
    app.use(cors({ origin: "*" }));
    app.use(compression());
    app.use(morgan("tiny"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ! to be corrected;
    app.use("/api/users", userRouter);
    app.use("/api/goods", goodRouter);
    app.use("/api/session", sessionRouter);
    app.use("/api/home", homeRouter);
    app.use("/api/admin", adminRouter);

    app.use(errorHandler);
}

export default router;
