class Room {
    constructor (props = {}) {
        const {
            id,
            name,
            ownerId
        } = props;

        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.createdAt = new Date();
        this.users = {};
    }

    addUser (user = {}) {
        const { id } = user;
        this.users[id] = user;
    }

    deleteUser (id) {
        delete this.users[id];
    }

    getUser (id) {
        return this.users[id];
    }

    getUsers () {
        return this.users;
    }
}

module.exports = Room;
