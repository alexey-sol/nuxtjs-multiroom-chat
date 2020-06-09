const {
    MESSAGE_SENT,
    ROOM_REMOVED,
    USER_LEFT
} = require("@utils/const/events/io");

const Message = require("@models/Message");
const { messages, rooms, users } = require("@models/storages");

function onLeave (io, socket, cb) {
    const { id } = socket;
    const user = users.getItem(id);

    if (user) {
        const { name, roomId } = user;

        users.removeItem(id);

        socket.broadcast.to(roomId).emit(USER_LEFT, id);

        const userLeftMessage = new Message({
            authorName: "system",
            roomId,
            text: `${name} has left the chat`
        });

        messages.addItem(userLeftMessage);

        socket.broadcast.to(roomId).emit(MESSAGE_SENT, userLeftMessage);

        const remainingUsers = users.getItems();

        if (remainingUsers.length === 0) {
            const { name } = rooms.getItem(roomId);
            rooms.removeItem(roomId);

            io.emit(ROOM_REMOVED, {
                id: roomId,
                name
            });
        }

        if (cb) {
            cb();
        }
    }
}

module.exports = onLeave;
