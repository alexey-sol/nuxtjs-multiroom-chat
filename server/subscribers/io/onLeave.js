const {
    MESSAGE_SENT,
    ROOM_REMOVED,
    USER_LEFT
} = require("@root/const/events/io");

const Message = require("@models/Message");
const { messages, rooms, users } = require("@models/storages");

function onLeave (io, socket, cb) {
    const { id } = socket;
    const user = users.getItem(id);

    if (user) {
        const { roomId } = user;

        removeUserAndReport(socket, user);

        const remainingUsers = users.getItems();
        const shouldRemoveRoom = remainingUsers.length === 0;

        if (shouldRemoveRoom) {
            removeRoomAndReport(io, roomId);
        }

        if (cb) {
            cb();
        }
    }
}

module.exports = onLeave;

function removeUserAndReport (socket, user) {
    const {
        id,
        name,
        roomId
    } = user;

    const removedUserId = users.removeItem(id);

    socket
        .broadcast
        .to(roomId)
        .emit(USER_LEFT, id);

    const userLeftMessage = new Message({
        authorName: "system",
        roomId,
        text: `${name} has left the chat`
    });

    messages.addItem(userLeftMessage);

    socket
        .broadcast
        .to(roomId)
        .emit(MESSAGE_SENT, userLeftMessage);

    return removedUserId;
}

function removeRoomAndReport (io, roomId) {
    const { name } = rooms.getItem(roomId);
    const removedRoomId = rooms.removeItem(roomId);

    io.emit(ROOM_REMOVED, {
        id: roomId,
        name
    });

    return removedRoomId;
}
