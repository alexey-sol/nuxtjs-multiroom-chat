const generateId = require("@utils/generators/generateId");

class Room {
    constructor ({
        createdAt = new Date(),
        id = generateId(),
        name
    }) {
        this.createdAt = createdAt;
        this.id = id;
        this.name = name;
    }
}

module.exports = Room;
