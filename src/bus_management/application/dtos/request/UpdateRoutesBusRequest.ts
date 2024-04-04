import { Coordinate } from "../../../domain/entities/Coordinate";

export class UpdateRoutesBusRequest {
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( origin: any, destination: any, region: string, uuidBus: string) {
        this.origin = new Coordinate(origin.latitude, origin.longitude);
        this.destination = new Coordinate(destination.latitude, destination.longitude);
        this.region = region;
        this.uuidBus = uuidBus;
    }
}