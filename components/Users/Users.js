import { mapMutations, mapState } from "vuex";

import { USER_JOINED, USER_LEFT } from "@/const/events/io";

export default {
    props: {
        currentUser: Object
    },

    computed: mapState({
        users: (state) => state.users.items
    }),

    methods: {
        ...mapMutations({
            addUser: "users/addUser",
            removeUser: "users/removeUser"
        })
    },

    mounted () {
        const { listener } = this.sockets;

        listener.subscribe(USER_JOINED, this.addUser);
        listener.subscribe(USER_LEFT, this.removeUser);
    },

    beforeDestroy () {
        const { listener } = this.sockets;

        listener.unsubscribe(USER_JOINED);
        listener.unsubscribe(USER_LEFT);
    }
};
