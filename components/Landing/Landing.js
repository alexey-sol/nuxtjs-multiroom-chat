import {
    Button,
    Container,
    Form,
    FormItem,
    Input,
    Message,
    Option,
    Select
} from "element-ui";

import { mapMutations, mapState } from "vuex";

import {
    CREATE_ROOM,
    GET_ROOMS,
    ROOM_CREATED,
    ROOM_REMOVED,
    SIGN_IN
} from "@/const/events/io";

import Landing from "@/components/Landing";

export default {
    components: {
        Button,
        Container,
        Form,
        FormItem,
        Input,
        Landing,
        Message,
        Option,
        Select
    },

    data () {
        return {
            chatName: "",
            selectedRoomId: "",
            userName: ""
        };
    },

    computed: mapState({
        roomOptions: ({ rooms }) => rooms
            .items
            .map(({ id, name }) => ({
                label: name,
                value: id
            }))
            .reverse()
    }),

    methods: {
        ...mapMutations({
            addRoom: "rooms/addRoom",
            removeRoom: "rooms/removeRoom",
            setCurrentUser: "setCurrentUser",
            setRooms: "rooms/setRooms"
        }),

        createRoom () {
            const roomProps = {
                name: this.chatName
            };

            const { error } = this.validateRoomProps(roomProps);

            if (error) {
                return this.$message.error(error.message);
            }

            this.emitCreateRoom(roomProps);
        },

        emitCreateRoom (roomProps) {
            this.$socket.emit(
                CREATE_ROOM,
                roomProps,
                (error, newRoom) => this.handleCreateRoomCb(error, newRoom)
            );
        },

        emitGetRooms () {
            this.$socket.emit(
                GET_ROOMS,
                (error, rooms) => this.handleGetRoomsCb(error, rooms)
            );
        },

        emitSignIn (userProps) {
            this.$socket.emit(
                SIGN_IN,
                userProps,
                (error, user) => this.handleSignInCb(error, user));
        },

        handleCreateRoomCb (error, newRoom) {
            if (error) {
                return this.$message.error(error.message);
            }

            this.addRoom(newRoom);

            this.$message({
                message: "Created!",
                type: "success"
            });
        },

        handleGetRoomsCb (error, rooms) {
            if (error) {
                return this.$message.error(error.message);
            }

            this.setRooms(rooms);
        },

        handleSignInCb (error, user) {
            if (error) {
                return this.$message.error(error.message);
            }

            this.setCurrentUser(user);

            this.$router.push({
                path: `/chat/${this.selectedRoomId}`
            });
        },

        signIn () {
            const userProps = {
                name: this.userName,
                roomId: this.selectedRoomId
            };

            const { error } = this.validateUserProps(userProps);

            if (error) {
                return this.$message.error(error.message);
            }

            this.emitSignIn(userProps);
        }
    },

    mounted () {
        this.emitGetRooms();

        const { listener } = this.sockets;

        listener.subscribe(
            ROOM_CREATED,
            this.addRoom
        );

        listener.subscribe(
            ROOM_REMOVED,
            this.removeRoom
        );
    },

    beforeDestroy () {
        const { listener } = this.sockets;

        listener.unsubscribe(GET_ROOMS);
        listener.unsubscribe(ROOM_CREATED);
        listener.unsubscribe(ROOM_REMOVED);
    }
};
