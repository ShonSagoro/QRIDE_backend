import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";

export class GetByUUIDRoutesBusCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    getByUUID(uuidBus: string): Promise<RoutesBus|null>{
        return this.routesBusInterface.findByUUID(uuidBus);
    }
}