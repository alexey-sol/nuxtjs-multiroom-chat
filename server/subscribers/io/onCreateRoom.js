const { ROOM_CREATED } = require("@root/const/events/io");
const Room = require("@models/Room");
const { rooms } = require("@models/storages");
const formatErrorForSocket = require("@utils/formatters/formatErrorForSocket");
const validateRoomProps = require("@utils/validators/validateRoomProps");

function onCreateRoom (socket, roomProps, cb) {
    try {
        const error = validateRoomProps(roomProps, rooms.getItems());

        if (error) {
            throw error;
        }

        const room = createRoomAndReport(socket, roomProps);

        cb(null, room);
    } catch (error) {
        cb(formatErrorForSocket(error));
    }
}

module.exports = onCreateRoom;

function createRoomAndReport (socket, roomProps) {
    const room = new Room(roomProps);

    rooms.addItem(room);

    socket
        .broadcast
        .emit(ROOM_CREATED, room);

    return room;
}
