import { Express } from "express";

import route from "./route";
import logger from "./logging";
import db from "./db";
import config from "./config";

class Bundler {
    static bundle (app: Express) {
        config();
        logger();
        db();
        route(app);
    }
}

export default Bundler;