import winston from "winston";

class Logger {
    public static create (): Logger {
        return new Logger();
    }

    public init(): void {
        winston.exceptions.handle(new winston.transports.File({ filename: "uncaughtExeptions.txt" }));

        process.on("unhandledRejection", (ex) => {
            throw ex;
        });

        winston.add(new winston.transports.File({ filename: "loggong.txt" }));
        winston.add(new winston.transports.Console());
    }
    
}


export default Logger.create();