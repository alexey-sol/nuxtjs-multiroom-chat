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

    methods: {
        // ...mapMutations([
        //     "rooms/addRoom",
        //     "setCurrentUser",
        //     "rooms/setRooms"
        // ]),
        ...mapMutations({
            addRoom: "rooms/addRoom",
            setCurrentUser: "setCurrentUser",
            setRooms: "rooms/setRooms"
        }),

        createChat () {
            const { chatName } = this;

            if (!chatName) {
                return this.$message.error("Please come up with a name for the room");
            }

            this.$socket.emit("createRoom", {
                name: chatName
            }, (error, newRoom) => {
                if (error) {
                    return this.$message.error(error.message);
                }

                this.$message({
                    message: "Created!",
                    type: "success"
                });

                this.addRoom(newRoom);
            });
        },

        signIn () {
            const { selectedRoomId, userName } = this;

            if (!userName) {
                return this.$message.error("Please type in your name");
            }

            if (!selectedRoomId) {
                return this.$message.error("Please choose a chat you would like to join");
            }

            this.$socket.emit("signIn", {
                name: userName,
                roomId: selectedRoomId
            }, (error, user) => {
                if (error) {
                    return this.$message.error(error.message);
                }

                this.setCurrentUser(user);

                this.$router.push({
                    path: `/chat/${selectedRoomId}`
                });
            });
        }
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

    mounted () {
        const { listener } = this.sockets;

        this.$socket.emit("getRooms", (error, rooms) => {
            if (error) {
                return this.$message.error(error.message);
            }

            this.setRooms(rooms);
        });

        listener.subscribe("roomCreated", (room) => {
            this.addRoom(room);
        });
    }
};
