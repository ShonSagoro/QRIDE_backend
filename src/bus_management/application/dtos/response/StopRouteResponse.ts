import { Coordinate } from "../../../domain/entities/Coordinate";
import { StopRoute } from "../../../domain/entities/StopRoute";

export class StopRouteResponse {
    public uuid:string;
    public point: Coordinate;
    public uuidRoute: string;

    constructor( stopRoute: StopRoute ) {
        this.uuid = stopRoute.uuid;
        this.point = stopRoute.point;
        this.uuidRoute = stopRoute.uuidRoute;
    }
}