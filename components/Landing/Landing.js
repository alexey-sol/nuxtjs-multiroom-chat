import {
    Button,
    Container,
    Form,
    FormItem,
    Header,
    Input,
    Main,
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
        Header,
        Input,
        Landing,
        Main,
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
        ...mapMutations([
            "addRoom",
            "updateRooms"
        ]),

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

        joinChat () {
            const { selectedRoomId, userName } = this;

            if (!userName) {
                return this.$message.error("It'd be nice to know your name");
            }

            if (!selectedRoomId) {
                return this.$message.error("Please choose a chat you would like to join");
            }

            this.$socket.emit("join", {
                roomId: selectedRoomId,
                userName
            }, (error, joinedRoom) => {
                if (error) {
                    return this.$message.error(error.message);
                }

                this.$router.push({
                    path: `/chat/${joinedRoom.id}`
                });
            });
        }
    },

    computed: mapState({
        roomOptions: ({ rooms }) => Object
            .values(rooms)
            .map(({ id, name }) => ({
                label: name,
                value: id
            }))
            .reverse()
    }),

    mounted () {
        this.$socket.emit("getRooms", (error, rooms) => {
            if (error) {
                return this.$message.error(error.message);
            }

            this.updateRooms(rooms);
        });
    }
};
