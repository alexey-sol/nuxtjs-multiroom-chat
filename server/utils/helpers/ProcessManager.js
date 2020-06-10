const { SIGTERM } = require("@root/const/signals");
const logger = require("@logger");

const ERROR_CODE = 1;
const SUCCESS_CODE = 0;

class ProcessManager {
    constructor (nodeProcess = process) {
        this.nodeProcess = nodeProcess;
    }

    get processEnv () {
        return this.nodeProcess.env;
    }

    get nodeEnv () {
        const { NODE_ENV } = this.processEnv;
        const isString = typeof NODE_ENV === "string";

        return (isString)
            ? NODE_ENV && NODE_ENV.trim()
            : "";
    }

    exit (loggingMessage, code = ERROR_CODE) {
        if (loggingMessage) {
            this.logMessage(loggingMessage, code);
        }

        this.nodeProcess.exit(code);
    }

    killGracefully (loggingMessage) {
        if (loggingMessage) {
            this.logMessage(loggingMessage, SUCCESS_CODE);
        }

        this.nodeProcess.kill(this.nodeProcess.pid, SIGTERM);
    }

    logMessage (loggingMessage, code) {
        const isSuccess = code === SUCCESS_CODE;

        if (isSuccess) {
            logger.info(loggingMessage);
        } else {
            logger.error(loggingMessage);
        }
    }
}

module.exports = ProcessManager;
