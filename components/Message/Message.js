import moment from "moment";

import { SYSTEM } from "@/const/reservedNames";

export default {
    props: {
        authorName: String,
        createdAt: Date,
        text: String
    },

    data () {
        return {
            isSystemMessage: this.authorName === SYSTEM
        };
    },

    methods: {
        formatDate (date) {
            return moment(date).format("HH:mm");
        }
    }
};
