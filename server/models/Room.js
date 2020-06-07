const User = require("./User");

class Room {
    constructor (props = {}) {
        const {
            id,
            name
        } = props;

        this.id = id;
        this.name = name;
        this.createdAt = new Date();
        this.users = {};
    }

    createUser (user = {}) {
        const { id, name } = user;

        this.users[id] = new User({
            id,
            name
        });

        return id;
    }

    deleteUser (id) {
        delete this.users[id];
        return id;
    }

    getUser (id) {
        return this.users[id];
    }

    getUsers () {
        return this.users;
    }
}

module.exports = Room;
