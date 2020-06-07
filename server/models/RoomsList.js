const Room = require("./Room");
const generateId = require("@utils/generators/generateId");

class RoomsList {
    constructor () {
        this.rooms = {};
    }

    createRoom (room = {}) {
        const id = generateId();
        const trimmedName = room.name.trim();

        if (!this.isNameUnique(trimmedName)) {
            throw new Error("Wait a minute! A room with such a name already exists");
        }

        const newRoom = new Room({
            id,
            name: trimmedName
        });

        this.rooms[id] = newRoom;
        return newRoom;
    }

    deleteRoom (id) {
        delete this.rooms[id];
        return id;
    }

    getRoom (id) {
        return this.rooms[id];
    }

    getRooms () {
        return this.rooms;
    }

    isNameUnique (roomName) {
        const roomsArray = Object.values(this.rooms);
        return !roomsArray.find(room => room.name === roomName);
    }
}

module.exports = RoomsList;
