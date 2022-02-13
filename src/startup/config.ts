import config from "config";
import winston from "winston";

function Config() {
    const jwtKey = config.get("jwtKey");

    if (!jwtKey) {
        winston.error("jwtkey is not defined");
        process.exit(1);
    }
}

export default Config;