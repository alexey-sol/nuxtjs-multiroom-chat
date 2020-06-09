import {
    Button,
    Container,
    Input
} from "element-ui";

import { mapMutations, mapState } from "vuex";

export default {
    components: {
        Button,
        Container,
        Input
    },

    computed: mapState({
        currentRoom: (state) => state.currentRoom,
        currentUser: (state) => state.currentUser,
        messages: (state) => state.messages.items,
        users: (state) => state.users.items
    }),

    mounted () {
        const { listener } = this.sockets;
        const { id } = this.$route.params;

        const shouldHaltVisitor = !this.currentUser.id;

        if (shouldHaltVisitor) {
            this.$message.error("Please sign in");
            return this.$router.push({
                path: "/"
            });
        }

        this.$socket.emit("join", this.currentUser, (error, roomData) => {
            if (error) {
                return this.$message.error(error.message);
            }

            const { room, messages, users } = roomData;

            this.setCurrentRoom(room);
            this.setMessages(messages);
            this.setUsers(users);
        });

        listener.subscribe("userJoined", (user) => {
            this.addUser(user);
        });

        listener.subscribe("userLeft", (id) => {
            this.removeUser(id);
        });

        listener.subscribe("messageSent", (message) => {
            this.addMessage(message);
        });
    },

    data () {
        return {
            message: ""
        };
    },

    // dataAsync () {
    // },

    methods: {
        ...mapMutations({
            addMessage: "messages/addMessage",
            addUser: "users/addUser",
            removeUser: "users/removeUser",
            setCurrentRoom: "setCurrentRoom",
            setCurrentUser: "setCurrentUser",
            setMessages: "messages/setMessages",
            setUsers: "users/setUsers"
        }),

        clearState () {
            this.setCurrentRoom({});
            this.setCurrentUser({});
            this.setMessages([]);
            this.setUsers([]);
        },

        leaveChat () {
            this.$socket.emit("leave", () => {
                this.clearState();

                this.$router.push({
                    path: "/"
                });
            });
        },

        sendMessage () {
            const { currentUser, message } = this;

            this.$socket.emit("sendMessage", {
                authorName: currentUser.name,
                roomId: currentUser.roomId,
                text: message
            });
        }
    }
};
