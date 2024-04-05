import { Coordinate } from "../../../domain/entities/Coordinate";

export class RoutesBusResponse {
    public uuid: string;
    public number: number;
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( uuid:string , number: number, origin: Coordinate, destination: Coordinate, region: string, uuidBus: string) {
        this.uuid = uuid;
        this.number = number;
        this.origin = origin;
        this.destination = destination;
        this.region = region;
        this.uuidBus = uuidBus;
    }

}