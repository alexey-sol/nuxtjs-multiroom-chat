const { MESSAGE_SENT, USER_JOINED } = require("@root/const/events/io");
const Message = require("@models/Message");
const { messages, rooms, users } = require("@models/storages");

function onJoin (socket, currentUser, cb) {
    const { roomId } = currentUser;
    const room = rooms.getItem(roomId);

    socket.join(roomId);

    const messagesWithWelcome = getAllMessagesForUser(currentUser);

    const roomData = {
        messages: messagesWithWelcome,
        room,
        users: users.getItems({ roomId })
    };

    reportUserJoined(socket, currentUser);

    cb(null, roomData);
}

module.exports = onJoin;

function getAllMessagesForUser (user) {
    const { name, roomId } = user;

    const welcomeMessage = new Message({
        authorName: "system",
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
        authorName: "system", // TODO - to const
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
