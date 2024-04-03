import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { UpdateRoutesBusRequest } from "../dtos/request/UpdateRoutesBusRequest";

export class UpdateRoutesBusCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }

    async update(uuidBus: string, request: UpdateRoutesBusRequest): Promise<void>{
        let routesBus = new RoutesBus(request.origin, request.destination, request.region, request.uuidBus);
        await this.routesBusInterface.update(uuidBus, routesBus);
    }
}