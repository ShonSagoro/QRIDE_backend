import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { CreateRoutesBusRequest } from "../dtos/request/CreateRoutesBusRequest";

export class CreateRoutesBusCase {
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async createValoration(request: CreateRoutesBusRequest): Promise<RoutesBus | null> {
        let routesBus = new RoutesBus(request.origin, request.destination, request.region, request.uuidBus);
        return await this.routesBusInterface.create(routesBus);
    }
}