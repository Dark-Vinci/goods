import express, { Express } from "express";
import winston from "winston";

import Bundler from "./startup/bundler";

const app: Express = express();

Bundler.bundle(app);

const port = process.env.PORT || 3030;
const server = app.listen(port, () => winston.info(`listening at port ${ port }`));
export default server;