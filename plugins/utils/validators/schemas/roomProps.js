import Joi from "@hapi/joi";

export default Joi.object({
    name: Joi
        .string()
        .required()
        .error(errors => errors.map(customizeNameError))
});

function customizeNameError (error) {
    const isEmpty = error.code === "string.empty";

    if (isEmpty) {
        error.message = "Please come up with a name for the room";
    }

    return error;
}
