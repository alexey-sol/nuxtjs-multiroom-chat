const { MESSAGE_SENT } = require("@utils/const/events/io");
const Message = require("@models/Message");
const { messages } = require("@models/storages");

function onSendMessage (io, messageProps) {
    const message = new Message(messageProps);

    messages.addItem(message);

    const { roomId } = messageProps;
    io.to(roomId).emit(MESSAGE_SENT, message);
}

module.exports = onSendMessage;
