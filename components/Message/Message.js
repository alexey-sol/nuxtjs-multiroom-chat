import moment from "moment";

import { SYSTEM } from "@/const/reservedNames";

export default {
    props: {
        isAuthor: Boolean,
        message: Object
    },

    data () {
        return {
            isSystemMessage: this.message.authorName === SYSTEM
        };
    },

    methods: {
        formatDate (date) {
            return moment(date).format("HH:mm");
        }
    }
};
