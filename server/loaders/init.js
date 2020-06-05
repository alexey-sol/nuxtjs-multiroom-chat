const envLoader = require("./env");
const expressLoader = require("./express");
const logger = require("@logger");

module.exports = async (app) => {
    envLoader();
    logger.info("🔵 Environment variables are ready");

    await expressLoader({ app });
    logger.info("🔵 Express is ready");
};
