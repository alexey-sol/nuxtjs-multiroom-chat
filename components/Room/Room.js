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
    SIGN_IN,
    USER_JOINED,
    USER_LEFT
} from "@/const/events/io";

import { UNAUTHORIZED_ERROR } from "@/const/errorNames";
import Message from "@/components/Message";
import SignInDialog from "@/components/SignInDialog";
import { mapMutations, mapState } from "vuex";

export default {
    head () {
        const roomName = this.currentRoom.name;

        return {
            title: (roomName)
                ? `Chat: ${roomName}`
                : "Chat"
        };
    },

    components: {
        Button,
        Container,
        Input,
        Message,
        SignInDialog
    },

    computed: mapState({
        currentRoom: (state) => state.currentRoom,
        currentUser: (state) => state.currentUser,
        messages: (state) => state.messages.items,
        users: (state) => state.users.items
    }),

    mounted () {
        this.emitJoin();

        const { listener } = this.sockets;

        listener.subscribe(USER_JOINED, this.addUser);
        listener.subscribe(USER_LEFT, this.removeUser);
        listener.subscribe(MESSAGE_SENT, this.addMessage);
    },

    data () {
        return {
            message: "",
            showSignIn: false
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

        emitJoin () {
            const { id } = this.$route.params;

            this.$socket.emit(
                JOIN,
                id,
                this.currentUser,
                this.handleJoinEvent
            );
        },

        emitLeave () {
            this.$socket.emit(
                LEAVE,
                this.handleLeaveEvent
            );
        },

        emitSendMessage () {
            const messageProps = {
                authorName: this.currentUser.name,
                roomId: this.currentUser.roomId,
                text: this.message
            };

            this.$socket.emit(
                SEND_MESSAGE,
                messageProps
            );
        },

        emitSignIn (userProps) {
            this.$socket.emit(
                SIGN_IN,
                userProps,
                this.handleSignInEvent
            );
        },

        handleJoinEvent (error, roomData) {
            if (error) {
                return this.handleJoinError(error);
            }

            this.handleJoinSuccess(roomData);
        },

        handleJoinError (error) {
            const isUnauthorized = error.name === UNAUTHORIZED_ERROR;

            if (isUnauthorized) {
                this.showSignIn = true;
            } else {
                this.$message.error(error.message);
                this.redirectToLanding();
            }
        },

        handleJoinSuccess (roomData) {
            const {
                messages,
                room,
                users
            } = roomData;

            this.setCurrentRoom(room);
            this.setMessages(messages);
            this.setUsers(users);
        },

        handleLeaveEvent () {
            this.clearState();
            this.redirectToLanding();
        },

        handleSignInEvent (error, user) {
            if (error) {
                return this.$message.error(error.message);
            }

            this.setCurrentUser(user);
            this.showSignIn = false;
            this.emitJoin();
        },

        redirectToLanding () {
            this.$router.push({
                path: "/"
            });
        },

        sendMessage () {
            if (!this.message) {
                return;
            }

            this.emitSendMessage();
            this.message = "";
            this.scrollDownAfterRenderingMessage();
        },

        scrollDownAfterRenderingMessage () {
            const chatWindowElem = this.$refs["chat-window"];

            if (chatWindowElem) {
                setTimeout(() => {
                    chatWindowElem.scrollTop = chatWindowElem.scrollHeight;
                }, 0);

                // Watcher didn't work out ("scrollHeight" remains obsolete after the
                // state changes); resorted to manipulate event loop.
            }
        },

        signIn (partialProps = {}) {
            if (!partialProps.name) {
                return this.$message.error("Please type in your name");
            }

            const roomId = this.$route.params.id;

            const userProps = {
                ...partialProps,
                roomId
            };

            this.emitSignIn(userProps);
        }
    }
};
