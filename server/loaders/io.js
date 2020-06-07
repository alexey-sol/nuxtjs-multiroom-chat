const socketIo = require("socket.io");

const RoomsList = require("@models/RoomsList");

const roomsList = new RoomsList();

const {
    CONNECTION,
    JOIN,
    LEAVE,
    MESSAGE
} = require("@utils/const/events/io");

module.exports = ({ server }) => {
    const io = socketIo(server);

    io.on(CONNECTION, (socket) => {
        socket.on("createRoom", (room, cb) => {
            try {
                const newRoom = roomsList.createRoom(room);
                cb(null, newRoom);
            } catch (error) {
                const message = { message: error.message };
                cb(message);
            }
        });

        socket.on("getRooms", (cb) => {
            cb(null, roomsList.getRooms());
        });

        socket.on(JOIN, (props, cb) => {
            const { roomId, userName } = props;
            socket.join(roomId);

            const roomToJoin = roomsList.getRoom(roomId);
            roomToJoin.createUser({
                name: userName
            });

            cb(null, roomToJoin);
        });
    });
};
