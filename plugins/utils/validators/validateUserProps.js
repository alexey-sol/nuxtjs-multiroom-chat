import schema from "./schemas/userProps";

export default function (userProps) {
    return schema.validate(userProps);
}
