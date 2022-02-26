import config from "config";
import winston from "winston";

class Config {
    private jwtKey = config.get("jwtKey") as string;

    public static create () {
        return new Config();
    }

    public init () {
        if (!this.jwtKey) {
            winston.error("jwtkey is not defined");
            process.exit(1);
        }
    }
}

export default Config.create();