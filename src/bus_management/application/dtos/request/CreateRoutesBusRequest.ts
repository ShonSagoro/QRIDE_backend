import { Coordinate } from "../../../domain/entities/Coordinate";

export class CreateRoutesBusRequest {
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( origin: Coordinate, destination: Coordinate, region: string, uuidBus: string) {
        this.origin = origin;
        this.destination = destination;
        this.region = region;
        this.uuidBus = uuidBus;
    }

}