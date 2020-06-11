import Joi from "@hapi/joi";

export default Joi.object({
    name: Joi
        .string()
        .required()
        .error(errors => errors.map(customizeNameError)),

    roomId: Joi
        .string()
        .required()
        .error(errors => errors.map(customizeRoomIdError))
});

function customizeNameError (error) {
    const isEmpty = error.code === "string.empty";

    if (isEmpty) {
        error.message = "Please type in your name";
    }

    return error;
}

function customizeRoomIdError (error) {
    const isEmpty = error.code === "string.empty";

    if (isEmpty) {
        error.message = "Please choose a chat you would like to join";
    }

    return error;
}
