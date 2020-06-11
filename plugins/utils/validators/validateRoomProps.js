import schema from "./schemas/roomProps";

export default function (roomProps) {
    return schema.validate(roomProps);
}
