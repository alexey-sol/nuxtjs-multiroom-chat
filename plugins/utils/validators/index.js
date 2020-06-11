import Vue from "vue";

import validateRoomProps from "./validateRoomProps";
import validateUserProps from "./validateUserProps";

Vue.mixin({
    methods: {
        validateRoomProps,
        validateUserProps
    }
});
