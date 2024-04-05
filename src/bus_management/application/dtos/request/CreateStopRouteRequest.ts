import { Coordinate } from "../../../domain/entities/Coordinate";

export class CreateStopRouteRequest {
    public routes: Coordinate[];
    public uuidRoute: string;

    constructor(uuidRoute: string, routes: any[]) {
        this.uuidRoute = uuidRoute;
        this.routes = routes.map((route) => new Coordinate(route.latitude, route.longitude));
    }

}