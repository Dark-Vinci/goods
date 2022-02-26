import { Server } from "http";
import winston from "winston";
import express, { Express } from "express";

import Bundler from "./startup/bundler";

class App {
    private app: Express = express();
    private server: Server | undefined;

    public static create (): App {
        return new App();
    }

    public start (): void {
        Bundler.init(this.app);

        const port = process.env.PORT || 3030;
        this.server = this.app.listen(port, () => winston.info(`listening at port ${ port }`));
    }

    public get serverGetter () {
        return this.server;
    }
}

export default App.create();