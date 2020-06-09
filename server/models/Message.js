const generateId = require("@utils/generators/generateId");

class Message {
    constructor ({
        authorName,
        createdAt = new Date(),
        id = generateId(),
        roomId,
        text
    }) {
        this.authorName = authorName;
        this.createdAt = createdAt;
        this.id = id;
        this.roomId = roomId;
        this.text = text;
    }
}

module.exports = Message;
