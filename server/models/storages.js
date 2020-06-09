const Storage = require("./Storage");

const messages = new Storage();
const rooms = new Storage();
const users = new Storage();

module.exports = {
    messages,
    rooms,
    users
};
