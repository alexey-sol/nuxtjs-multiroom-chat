const { SYSTEM } = require("@root/const/reservedNames");
const ValidationError = require("@utils/errors/ValidationError");
const nameIsUniqueIn = require("@utils/helpers/nameIsUniqueIn");

function validateUserProps (props, users) {
    const { name = "" } = props;
    const trimmedName = name.trim();

    let message = "";
    const nameIsReserved = trimmedName.toLowerCase() === SYSTEM;

    if (nameIsReserved) {
        message = "This name is reserved";
        return new ValidationError(message);
    }

    if (!nameIsUniqueIn(users, trimmedName)) {
        message = "This name is already taken";
        return new ValidationError(message);
    }

    return null;
}

module.exports = validateUserProps;
