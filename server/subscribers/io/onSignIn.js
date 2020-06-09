const User = require("@models/User");
const ValidationError = require("@utils/errors/ValidationError");
const { rooms, users } = require("@models/storages");
const formatErrorForSocket = require("@utils/formatters/formatErrorForSocket");
const validateUserProps = require("@utils/validators/validateUserProps");

function onSignIn (socket, userProps, cb) {
    const { roomId } = userProps;
    const room = rooms.getItem(roomId);

    try {
        const roomUsers = users.getItems({ roomId });
        const error = validateUserProps(userProps, roomUsers);

        if (error) {
            throw error;
        }

        if (!room) {
            throw new ValidationError("No chat found");
        }
    } catch (error) {
        return cb(formatErrorForSocket(error));
    }

    const user = new User({
        ...userProps,
        id: socket.id
    });

    users.addItem(user);

    cb(null, user);
}

module.exports = onSignIn;
