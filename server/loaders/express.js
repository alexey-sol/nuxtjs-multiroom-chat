const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const path = require("path");

const config = require("@root/nuxt.config.js");

module.exports = async (options) => {
    const { app } = options;

    const root = process.cwd();
    const publicDirPath = path.join(root, "public");

    const nuxt = new Nuxt(config);
    await nuxt.ready();

    if (config.dev) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    app.use(nuxt.render);
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(compression());
    app.use(express.static(publicDirPath));

    return app;
};
