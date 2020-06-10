const { MESSAGE_SENT, USER_JOINED } = require("@root/const/events/io");
const { SYSTEM } = require("@root/const/reservedNames");
const Message = require("@models/Message");
const UnauthorizedError = require("@utils/errors/UnauthorizedError");
const ValidationError = require("@utils/errors/ValidationError");
const { messages, rooms, users } = require("@models/storages");
const formatErrorForSocket = require("@utils/formatters/formatErrorForSocket");

function onJoin (socket, roomId, user, cb) {
    try {
        const { id } = user;
        const room = rooms.getItem(roomId);
        const userIsAuthed = Boolean(id);

        if (!room) {
            throw new ValidationError("No chat found");
        }

        if (!userIsAuthed) {
            throw new UnauthorizedError();
        }

        socket.join(roomId);

        // let messagesWithWelcome = getMessagesWithWelcome(user);

        const roomData = {
            messages: getMessagesWithWelcome(user),
            room,
            users: users.getItems({ roomId })
        };

        reportUserJoined(socket, user);

        cb(null, roomData);
    } catch (error) {
        cb(formatErrorForSocket(error));
    }
}

module.exports = onJoin;

function getMessagesWithWelcome (user) {
    const { name, roomId } = user;

    const welcomeMessage = new Message({
        authorName: SYSTEM,
        roomId,
        text: `Welcome, ${name}!`
    });

    return [
        ...messages.getItems({ roomId }),
        welcomeMessage
    ];
}

function reportUserJoined (socket, user) {
    const { name, roomId } = user;

    const userJoinedMessage = new Message({
        authorName: SYSTEM,
        roomId,
        text: `${name} has joined the chat`
    });

    messages.addItem(userJoinedMessage);

    socket
        .broadcast
        .to(roomId)
        .emit(MESSAGE_SENT, userJoinedMessage);

    socket
        .broadcast
        .to(roomId)
        .emit(USER_JOINED, user);

    return user;
}
