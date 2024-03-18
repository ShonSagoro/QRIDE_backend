import { Coordinate } from "../../../domain/entities/Coordinate";

export class CreateUserHistoryRequest {
    public origin: Coordinate;
    public destiny: Coordinate;
    public user_uuid: string;

    constructor(origin: Coordinate, destiny: Coordinate, user_uuid: string) {
        this.origin = origin;
        this.destiny = destiny;
        this.user_uuid = user_uuid;
    }
}