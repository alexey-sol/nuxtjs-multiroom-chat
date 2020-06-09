const { MESSAGE_SENT, USER_JOINED } = require("@utils/const/events/io");
const Message = require("@models/Message");
const { messages, rooms, users } = require("@models/storages");

function onJoin (socket, currentUser, cb) {
    const {
        name,
        roomId
    } = currentUser;

    const room = rooms.getItem(roomId);

    socket.join(roomId);

    const welcomeMessage = new Message({
        authorName: "system",
        roomId,
        text: `Welcome, ${name}!`
    });

    const messagesWithWelcome = [
        ...messages.getItems({ roomId }),
        welcomeMessage
    ];

    const roomData = {
        messages: messagesWithWelcome,
        room,
        users: users.getItems({ roomId })
    };

    const userJoinedMessage = new Message({
        authorName: "system",
        roomId,
        text: `${name} has joined the chat`
    });

    messages.addItem(userJoinedMessage);

    socket.broadcast.to(roomId).emit(MESSAGE_SENT, userJoinedMessage);
    socket.broadcast.to(roomId).emit(USER_JOINED, currentUser);

    cb(null, roomData);
}

module.exports = onJoin;
