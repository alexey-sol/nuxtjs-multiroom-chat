const dotenv = require("dotenv");

const { DEVELOPMENT } = require("@root/const/nodeEnv");
const ProcessManager = require("@utils/helpers/ProcessManager");
const validateEnv = require("@utils/validators/validateEnv");

module.exports = () => {
    const { nodeEnv } = new ProcessManager();

    if (!nodeEnv) {
        logErrorAndExit("🔴 NODE_ENV is not set");
    }

    const isDevelopment = nodeEnv === DEVELOPMENT;

    if (isDevelopment) {
        dotenv.config();
    }

    const { error } = validateEnv();

    if (error) {
        logErrorAndExit(error);
    }
};

function logErrorAndExit (error) {
    new ProcessManager().exit(error);
}
