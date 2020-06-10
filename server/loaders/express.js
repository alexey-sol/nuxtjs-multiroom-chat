const { Nuxt, Builder } = require("nuxt");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const { DEVELOPMENT } = require("@root/const/nodeEnv");
const ProcessManager = require("@utils/helpers/ProcessManager");
const config = require("@root/nuxt.config.js");

module.exports = async ({ app }) => {
    const nuxt = new Nuxt(config);
    await nuxt.ready();

    const { nodeEnv } = new ProcessManager();
    const isDevelopment = nodeEnv === DEVELOPMENT;

    if (isDevelopment) {
        const builder = new Builder(nuxt);
        await builder.build();
    }

    app.use(nuxt.render);
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(compression());

    return app;
};
