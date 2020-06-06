class Message {
    constructor (props = {}) {
        const { id, name } = props;

        this.id = id;
        this.name = name;
        this.message = [];
    }
}

module.exports = Message;
