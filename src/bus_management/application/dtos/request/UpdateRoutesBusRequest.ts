import { Coordinate } from "../../../domain/entities/Coordinate";

export class UpdateRoutesBusRequest {
    public number: number;
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( number:number, origin: any, destination: any, region: string, uuidBus: string) {
        this.number = number;
        this.origin = new Coordinate(parseInt(origin.latitude), parseInt(origin.longitude));
        this.destination = new Coordinate(destination.latitude, destination.longitude);
        this.region = region;
        this.uuidBus = uuidBus;
    }
}