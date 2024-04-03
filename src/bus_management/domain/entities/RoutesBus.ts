import { Coordinate } from "./Coordinate";
import { v4 as uuidv4 } from 'uuid';

export class RoutesBus {
    public uuid: string;
    public origin: Coordinate;
    public destination: Coordinate;
    public region: string;
    public uuidBus: string;

    constructor( origin: Coordinate, destination: Coordinate, region: string, uuidBus: string) {
        this.uuid = uuidv4();
        this.origin = origin;
        this.destination = destination;
        this.region = region;
        this.uuidBus = uuidBus;
    }
    
}