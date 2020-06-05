const Joi = require("@hapi/joi");

const {
    DEVELOPMENT,
    PRODUCTION
} = require("@utils/const/nodeEnv");

module.exports = Joi.object({
    BASE_URL: Joi
        .string()
        .required(),

    HOST: Joi
        .string()
        .required(),

    NODE_ENV: Joi
        .string()
        .trim()
        .valid(DEVELOPMENT, PRODUCTION)
        .required(),

    PORT: Joi
        .number()
        .required()
});
