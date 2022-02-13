import mongoose from "mongoose";
import config from "config";
import winston from "winston";

async function connect(): Promise<void> {
    const db = config.get("db");

    try {
        await mongoose.connect("mongodb://localhost/goodie");
        winston.info(`connected to ${ db }`);
    } catch (ex) {
        winston.error(`couldnt connect to ${ db } because of ${ ex }`);
        process.exit(1);
    }
}

export default connect;