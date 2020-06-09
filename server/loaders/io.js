const socketIO = require("socket.io");

const Message = require("@models/Message");
const Room = require("@models/Room");
const ValidationError = require("@utils/errors/ValidationError");
const User = require("@models/User");
const validateRoomProps = require("@utils/validators/validateRoomProps");
const validateUserProps = require("@utils/validators/validateUserProps");

const {
    messages,
    rooms,
    users
} = require("@models/storages");

const {
    CONNECTION,
    JOIN,
    LEAVE,
    MESSAGE
} = require("@utils/const/events/io");

function formatErrorForSocket (error = {}) {
    return { message: error.message };
}

module.exports = ({ server }) => {
    const io = socketIO(server);

    io.on(CONNECTION, (socket) => {
        socket.on("createRoom", (roomProps, cb) => {
            try {
                const error = validateRoomProps(roomProps, rooms.getItems());

                if (error) {
                    throw error;
                }

                const room = new Room(roomProps);
                rooms.addItem(room);

                socket.broadcast.emit("roomCreated", room);

                cb(null, room);
            } catch (error) {
                cb(formatErrorForSocket(error));
            }
        });

        socket.on("getRooms", (cb) => {
            cb(null, rooms.getItems());
        });

        socket.on("signIn", (userProps, cb) => {
            const { roomId } = userProps;
            const room = rooms.getItem(roomId);

            try {
                const roomUsers = users.getItems({ roomId });
                const error = validateUserProps(userProps, roomUsers);

                if (error) {
                    throw error;
                }

                if (!room) {
                    throw new ValidationError("No chat found");
                }
            } catch (error) {
                return cb(formatErrorForSocket(error));
            }

            const user = new User({
                ...userProps,
                id: socket.id
            });

            users.addItem(user);

            cb(null, user);
        });

        socket.on(JOIN, (currentUser, cb) => {
            const {
                name,
                roomId
            } = currentUser;

            const room = rooms.getItem(roomId);

            socket.join(roomId);

            const welcomeMessage = new Message({
                authorName: "system",
                roomId,
                text: `Welcome, ${name}!`
            });

            const messagesWithWelcome = [
                ...messages.getItems({ roomId }),
                welcomeMessage
            ];

            const roomData = {
                messages: messagesWithWelcome,
                room,
                users: users.getItems({ roomId })
            };

            const userJoinedMessage = new Message({
                authorName: "system",
                roomId,
                text: `${name} has joined the chat`
            });

            messages.addItem(userJoinedMessage);

            socket.broadcast.to(roomId).emit("message", userJoinedMessage);
            socket.broadcast.to(roomId).emit("userJoined", currentUser);

            cb(null, roomData);
        });

        socket.on("message", (messageProps) => {
            const message = new Message(messageProps);

            messages.addItem(message);

            const { roomId } = messageProps;
            io.to(roomId).emit("message", message);
        });

        socket.on("leave", (cb) => {
            const { id } = socket;
            const user = users.getItem(id);

            if (user) {
                const { name, roomId } = user;

                users.removeItem(id);

                socket.broadcast.to(roomId).emit("userLeft", id); // TODO: cure copy-paste

                const userLeftMessage = new Message({
                    authorName: "system",
                    roomId,
                    text: `${name} has left the chat`
                });

                messages.addItem(userLeftMessage);

                socket.broadcast.to(roomId).emit("message", userLeftMessage);

                cb();
            }
        });

        socket.on("disconnect", () => {
            const { id } = socket;
            const user = users.getItem(id);

            if (user) {
                const { name, roomId } = user;
                users.removeItem(id);
                socket.broadcast.to(roomId).emit("left", id); // TODO: cure copy-paste

                const userLeftMessage = new Message({
                    authorName: "system",
                    roomId,
                    text: `${name} has left the chat`
                });

                messages.addItem(userLeftMessage);

                socket.broadcast.to(roomId).emit("message", userLeftMessage);
            }
        });
    });
};
