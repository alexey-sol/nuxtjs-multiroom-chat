const express = require("express");
const http = require("http");

const { SIGTERM } = require("@utils/const/signals");
const ProcessManager = require("@utils/helpers/ProcessManager");
const loaders = require("@loaders");
const logger = require("@logger");

startServer();

async function startServer () {
    const app = express();
    const server = http.createServer(app);

    await loaders.init({ app, server });

    const { baseUrl, port } = require("@config/server");
    const { exit, nodeEnv } = new ProcessManager();

    server.listen(+port, (error) => (error)
        ? exit(error)
        : logSuccess({ baseUrl, nodeEnv })
    );

    process.on(SIGTERM, () => logInfoAndCloseServer(server));
}

function logSuccess (options) {
    const { baseUrl, nodeEnv } = options;
    logger.info(`🚀 Server is running at ${baseUrl} in ${nodeEnv} mode`);
}

function logInfoAndCloseServer (server) {
    server.close(() => logger.info("Process terminated"));
}
