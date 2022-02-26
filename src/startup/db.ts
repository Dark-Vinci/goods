import mongoose from "mongoose";
import config from "config";
import winston from "winston";

class DB {
    private dbUri = config.get("db") as string;

    public static create () {
        return new DB();
    }

    public async connect(): Promise<void> {
        try {
            await mongoose.connect(this.dbUri);
            
            winston.info(`connected to ${ this.dbUri }`);
        } catch (ex: unknown) {
            winston.error(`couldnt connect to ${ this.dbUri } because of ${ ex }`);

            process.exit(1);
        }
    }
}

export default DB.create();