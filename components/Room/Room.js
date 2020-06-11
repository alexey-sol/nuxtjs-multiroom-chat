import { Button, Container } from "element-ui";
import { mapMutations, mapState } from "vuex";

import {
    JOIN,
    LEAVE,
    SIGN_IN
} from "@/const/events/io";

import MessageInput from "@/components/MessageInput";
import Messages from "@/components/Messages";
import Users from "@/components/Users";

import { UNAUTHORIZED_ERROR } from "@/const/errorNames";
import SignInDialog from "@/components/SignInDialog";

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
        MessageInput,
        Messages,
        Users,
        SignInDialog
    },

    data () {
        return {
            showSignIn: false
        };
    },

    computed: mapState({
        currentRoom: (state) => state.currentRoom,
        currentUser: (state) => state.currentUser
    }),

    methods: {
        ...mapMutations({
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
                this.handleJoinCb
            );
        },

        emitLeave () {
            this.$socket.emit(
                LEAVE,
                this.handleLeaveCb
            );
        },

        emitSignIn (userProps) {
            this.$socket.emit(
                SIGN_IN,
                userProps,
                this.handleSignInCb
            );
        },

        handleJoinCb (error, roomData) {
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

        handleLeaveCb () {
            const { name } = this.currentRoom;

            this.$message({
                message: `The room "${name}" has been removed since there's nobody left`,
                type: "warning"
            });

            this.clearState();
            this.redirectToLanding();
        },

        handleSignInCb (error, user) {
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

        signIn (name) {
            const userProps = {
                name,
                roomId: this.$route.params.id
            };

            const { error } = this.validateUserProps(userProps);

            if (error) {
                return this.$message.error(error.message);
            }

            this.emitSignIn(userProps);
        }
    },

    mounted () {
        this.emitJoin();
    }
};
