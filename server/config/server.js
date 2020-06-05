const ProcessManager = require("@utils/helpers/ProcessManager");

const { processEnv } = new ProcessManager();
const validatedEnv = processEnv;

const {
    BASE_URL,
    HOST,
    PORT
} = validatedEnv;

module.exports = {
    baseUrl: BASE_URL,
    host: HOST,
    port: PORT
};
