import { Button, Input } from "element-ui";

import { SEND_MESSAGE } from "@/const/events/io";

export default {
    components: {
        Button,
        Input
    },

    props: {
        currentUser: Object
    },

    data () {
        return {
            message: ""
        };
    },

    methods: {
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

        sendMessage () {
            if (!this.message) {
                return;
            }

            this.emitSendMessage();
            this.message = "";
        }
    }
};
