import winston from "winston";

export const Logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp({ format: "DD/MM/YYYY|hh:mm" }),
		winston.format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}][${level}] - ${message}`;
		}),
	),
	defaultMeta: { service: "user-service" },
	transports: [new winston.transports.Console()],
});
