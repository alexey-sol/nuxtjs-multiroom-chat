const socketIO = require("socket.io");

const {
    onCreateRoom,
    onGetRooms,
    onJoin,
    onLeave,
    onSendMessage,
    onSignIn
} = require("@subscribers/io");

const {
    CONNECTION,
    CREATE_ROOM,
    DISCONNECT,
    GET_ROOMS,
    JOIN,
    LEAVE,
    SEND_MESSAGE,
    SIGN_IN
} = require("@root/const/events/io");

module.exports = ({ server }) => {
    const io = socketIO(server);

    io.on(CONNECTION, (socket) => {
        socket.on(
            CREATE_ROOM,
            (roomProps, cb) => onCreateRoom(socket, roomProps, cb)
        );

        socket.on(
            DISCONNECT,
            () => onLeave(io, socket)
        );

        socket.on(
            GET_ROOMS,
            onGetRooms
        );

        socket.on(
            JOIN,
            (roomId, user, cb) => onJoin(socket, roomId, user, cb)
        );

        socket.on(
            LEAVE,
            (cb) => onLeave(io, socket, cb)
        );

        socket.on(
            SEND_MESSAGE,
            (messageProps) => onSendMessage(io, messageProps)
        );

        socket.on(
            SIGN_IN,
            (userProps, cb) => onSignIn(socket, userProps, cb)
        );
    });
};
