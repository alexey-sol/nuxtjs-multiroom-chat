const envLoader = require("./env");
const expressLoader = require("./express");
const ioLoader = require("./io");
const logger = require("@logger");

module.exports = async ({ app, server }) => {
    envLoader();
    logger.info("🔵 Environment variables are ready");

    ioLoader({ server });
    logger.info("🔵 WebSocket is ready");

    await expressLoader({ app });
    logger.info("🔵 Express is ready");
};
