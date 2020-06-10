const { MESSAGE_SENT } = require("@root/const/events/io");
const Message = require("@models/Message");
const { messages } = require("@models/storages");

function onSendMessage (io, messageProps) {
    const { roomId } = messageProps;
    const message = new Message(messageProps);

    messages.addItem(message);

    io
        .to(roomId)
        .emit(MESSAGE_SENT, message);
}

module.exports = onSendMessage;
