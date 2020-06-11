import { mapMutations, mapState } from "vuex";

import { MESSAGE_SENT } from "@/const/events/io";
import Message from "@/components/Message";

export default {
    components: {
        Message
    },

    props: {
        currentUser: Object
    },

    computed: mapState({
        messages: (state) => state.messages.items
    }),

    methods: {
        ...mapMutations({
            addMessage: "messages/addMessage"
        }),

        handleMessageSent (message) {
            this.addMessage(message);

            const shouldScrollDown = this.currentUser.name === message.authorName;

            if (shouldScrollDown) {
                this.scrollDownAfterRenderingMessage();
            }
        },

        scrollDownAfterRenderingMessage () {
            const messagesElem = this.$refs.messages;

            if (messagesElem) {
                setTimeout(() => {
                    messagesElem.scrollTop = messagesElem.scrollHeight;
                }, 0);
            }
        }
    },

    mounted () {
        const { listener } = this.sockets;

        listener.subscribe(
            MESSAGE_SENT,
            (message) => this.handleMessageSent(message)
        );
    },

    beforeDestroy () {
        const { listener } = this.sockets;

        listener.unsubscribe(MESSAGE_SENT);
    }
};
