import { Coordinate } from "./Coordinate";
import { v4 as uuidv4 } from 'uuid';

export class UserHistory {
    public uuid: string;
    public origin: Coordinate;
    public destiny: Coordinate;
    public user_uuid: string;

    constructor(origin: Coordinate, destiny: Coordinate, user_uuid: string) {
        this.uuid = uuidv4();
        this.origin = origin;
        this.destiny = destiny;
        this.user_uuid = user_uuid;
    }
}