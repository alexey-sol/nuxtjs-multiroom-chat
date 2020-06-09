const { rooms } = require("@models/storages");

function onGetRooms (cb) {
    cb(null, rooms.getItems());
}

module.exports = onGetRooms;
