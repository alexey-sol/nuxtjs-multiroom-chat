import {
    Button,
    Container,
    Input
} from "element-ui";

import {
    JOIN,
    LEAVE,
    MESSAGE_SENT,
    SEND_MESSAGE,
    USER_JOINED,
    USER_LEFT
} from "@/const/events/io";

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

        // TODO: if no currentUser, show popup to sign up

        // TODO: doc title is chat's name

        this.$socket.emit(JOIN, this.currentUser, (error, roomData) => {
            if (error) {
                return this.$message.error(error.message);
            }

            const { room, messages, users } = roomData;

            this.setCurrentRoom(room);
            this.setMessages(messages);
            this.setUsers(users);
        });

        listener.subscribe(USER_JOINED, (user) => {
            this.addUser(user);
        });

        listener.subscribe(USER_LEFT, (id) => {
            this.removeUser(id);
        });

        listener.subscribe(MESSAGE_SENT, (message) => {
            console.log(message)
            this.addMessage(message);
        });
    },

    data () {
        return {
            message: ""
        };
    },

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
            this.$socket.emit(LEAVE, () => {
                this.clearState();

                this.$router.push({
                    path: "/"
                });
            });
        },

        sendMessage () {
            const { currentUser, message } = this;

            this.$socket.emit(SEND_MESSAGE, {
                authorName: currentUser.name,
                roomId: currentUser.roomId,
                text: message
            });
        }
    }
};
