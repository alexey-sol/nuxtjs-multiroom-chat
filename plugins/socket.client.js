import SocketIO from "socket.io-client";
import Vue from "vue";
import VueSocketIO from "vue-socket.io";

export default function () {
    const { BASE_URL } = process.env;

    Vue.use(new VueSocketIO({
        debug: false,
        connection: SocketIO(BASE_URL)
    }));
}
