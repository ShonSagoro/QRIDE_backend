import { Coordinate } from "../../../domain/entities/Coordinate";

export class RoutesBusResponse {
    public uuid: string;
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( uuid:string , origin: Coordinate, destination: Coordinate, region: string, uuidBus: string) {
        this.uuid = uuid;
        this.origin = origin;
        this.destination = destination;
        this.region = region;
        this.uuidBus = uuidBus;
    }

}