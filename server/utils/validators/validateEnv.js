const ProcessManager = require("@utils/helpers/ProcessManager");
const envSchema = require("./schemas/env");

const { processEnv } = new ProcessManager();

function validateEnv (env = processEnv) {
    return envSchema.validate(env, {
        stripUnknown: true
    });
}

module.exports = validateEnv;
