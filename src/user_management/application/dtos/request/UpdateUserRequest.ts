import { Coordinate } from "../../../domain/entities/Coordinate";

export class UpdateUserHistoryRequest {
    public uuid: string;
    public origin: Coordinate;
    public destiny: Coordinate;
    public user_uuid: string;

    constructor(uuid: string, origin: Coordinate, destiny: Coordinate, user_uuid: string) {
        this.uuid = uuid;
        this.origin = origin;
        this.destiny = destiny;
        this.user_uuid = user_uuid;
    }
}