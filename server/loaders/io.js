const socketIo = require("socket.io");

const {
    CONNECTION,
    LEAVE,
    MESSAGE
} = require("@utils/const/events/io");

// import { onLeave, onMessage } from "@subscribers/io";
// import chatApiPublisher from "@publishers/chatApiPublisher";

module.exports = ({ server }) => {
    const io = socketIo(server);

    io.on(CONNECTION, (socket) => {
        // const { groupId } = socket.handshake.query;
        // const groupMessageEvent = `${MESSAGE}:${groupId}`;

        // socket.join(groupId);

        // chatApiPublisher.on(
        //     groupMessageEvent,
        //     (data) => onMessage(io, groupId, data)
        // );

        // chatApiPublisher.on(
        //     LEAVE,
        //     () => onLeave(socket, groupId)
        // );
    });
}
