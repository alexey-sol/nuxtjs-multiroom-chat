const ValidationError = require("@utils/errors/ValidationError");
const nameIsUniqueIn = require("@utils/helpers/nameIsUniqueIn");

function validateUserProps (props, users) {
    const { name = "" } = props;
    const trimmedName = name.trim();

    let message = "";

    if (trimmedName.toLowerCase() === "system") {
        message = "This name is forbidden";
        return new ValidationError(message);
    }

    if (!nameIsUniqueIn(users, trimmedName)) {
        message = "This name is already taken";
        return new ValidationError(message);
    }

    return null;
}

module.exports = validateUserProps;
