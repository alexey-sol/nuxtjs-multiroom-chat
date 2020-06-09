const ValidationError = require("@utils/errors/ValidationError");
const nameIsUniqueIn = require("@utils/helpers/nameIsUniqueIn");

function validateRoomProps (props, rooms) {
    const { name = "" } = props;
    const trimmedName = name.trim();

    if (!nameIsUniqueIn(rooms, trimmedName)) {
        const message = "Wait a minute! A room with such a name already exists";
        return new ValidationError(message);
    }

    return null;
}

module.exports = validateRoomProps;
