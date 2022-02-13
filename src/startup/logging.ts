import winston from "winston";

function logging(): void {
    winston.exceptions.handle(new winston.transports.File({ filename: "uncaughtExeptions.txt" }));

    process.on("unhandledRejection", (ex) => {
        throw ex;
    });

    winston.add(new winston.transports.File({ filename: "loggong.txt" }));
    winston.add(new winston.transports.Console());
}

export default logging;