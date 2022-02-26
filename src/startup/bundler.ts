import { Express } from "express";

import route from "./route";
import logger from "./logging";
import db from "./db";
import config from "./config";

class Bundler {
    public static init (app: Express) {
        config.init();
        logger.init();
        db.connect();
        route.init(app);
    }
}

export default Bundler;