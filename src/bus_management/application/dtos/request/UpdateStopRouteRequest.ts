import { Coordinate } from "../../../domain/entities/Coordinate";

export class UpdateStopRouteRequest {
    public route: Coordinate;
    public uuidRoute: string;

    constructor(uuidRoute: string, route: Coordinate) {
        this.uuidRoute = uuidRoute;
        this.route = route;

    }

}