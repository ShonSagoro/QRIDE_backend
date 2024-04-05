import { Coordinate } from "../../../domain/entities/Coordinate";

export class SearchAproximationRequest {
    public routes: Coordinate;

    constructor(route: any) {
        this.routes = new Coordinate(route.latitude, route.longitude)
    }

}