import {
    Button,
    Dialog,
    Form,
    FormItem,
    Input
} from "element-ui";

export default {
    components: {
        Button,
        Dialog,
        Form,
        FormItem,
        Input
    },

    props: {
        handleCancel: Function,
        handleSubmit: Function,
        visible: Boolean
    },

    data () {
        return {
            name: ""
        };
    }
};
