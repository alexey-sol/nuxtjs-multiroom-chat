const Message = require("./Message");
const generateId = require("@utils/generators/generateId");

class User {
    constructor (props = {}) {
        const { id, name } = props;

        this.id = id;
        this.name = name;
        this.messages = {};
    }

    createMessage (text) {
        const id = generateId();

        this.messages[id] = new Message({
            id,
            text,
            userId: this.id
        });

        return id;
    }

    deleteMessage (id) {
        delete this.messages[id];
        return id;
    }

    getMessage (id) {
        return this.messages[id];
    }

    getMessages () {
        return this.messages;
    }
}

module.exports = User;
