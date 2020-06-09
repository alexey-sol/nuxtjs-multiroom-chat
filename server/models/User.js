const generateId = require("@utils/generators/generateId");

class User {
    constructor ({
        createdAt = new Date(),
        id = generateId(),
        name,
        roomId
    }) {
        this.createdAt = createdAt;
        this.id = id;
        this.name = name;
        this.roomId = roomId;
    }
}

module.exports = User;
