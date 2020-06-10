const { createLogger, format, transports } = require("winston");
const path = require("path");

const { DEBUG, ERROR } = require("@root/const/loggingLevels");
const { PRODUCTION } = require("@root/const/nodeEnv");
const DateFormatter = require("@utils/formatters/DateFormatter");

const {
    combine,
    errors,
    prettyPrint,
    timestamp
} = format;

const dateTimeFormatPattern = "YYYY-MM-DD HH:mm:ss";

const logger = createLogger({
    format: getCombinedFormat(),
    transports: createWinstonTransports(),
    exitOnError: false
});

module.exports = logger;

function getCombinedFormat () {
    return combine(
        errors({ stack: true }),
        timestamp({ format: dateTimeFormatPattern }),
        prettyPrint()
    );
}

function createWinstonTransports () {
    const result = [];

    const nodeEnv = process.env.NODE_ENV.trim();
    const isProduction = nodeEnv === PRODUCTION;

    if (isProduction) {
        pushFileOptionsTo(result);
    }

    pushConsoleOptionsTo(result);
    return result;
}

function pushFileOptionsTo (loggerTransports) {
    loggerTransports.push(
        new transports.File(getFileOptionsForLevel(ERROR)),
        new transports.File(getFileOptionsForLevel(DEBUG))
    );
}

function pushConsoleOptionsTo (loggerTransports) {
    loggerTransports.push(
        new transports.Console(getConsoleOptions())
    );
}

function getFileOptionsForLevel (level) {
    const root = process.cwd();
    const logsDirPath = path.join(root, "logs");

    return {
        filename: path.join(logsDirPath, `${level}.log`),
        handleExceptions: true,
        level,
        maxsize: convertMbToBytes(5),
        maxFiles: 5
    };
}

function convertMbToBytes (mb) {
    return mb * 1024 ** 2;
}

function getConsoleOptions () {
    return {
        format: getConsoleFormat(),
        handleExceptions: true,
        level: DEBUG
    };
}

function getConsoleFormat () {
    const printToConsole = format.printf(formatConsoleLog);

    return format.combine(
        format.colorize(),
        printToConsole
    );
}

function formatConsoleLog (info) {
    const date = new DateFormatter()
        .formatByPattern(dateTimeFormatPattern);

    const infoContent = (info.stack)
        ? `${info.stack}\n`
        : `${info.message}\n`;

    return `${date} ${info.level}: ${infoContent}`;
}
