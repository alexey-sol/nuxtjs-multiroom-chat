class Message {
    constructor (props = {}) {
        const {
            id,
            text,
            userId
        } = props;

        this.id = id;
        this.text = text;
        this.userId = userId;
        this.createdAt = new Date();
    }
}

module.exports = Message;
