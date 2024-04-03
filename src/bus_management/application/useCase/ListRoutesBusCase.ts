import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";

export class ListRoutesBusCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async list(): Promise<RoutesBus[]|null>{
        return await this.routesBusInterface.list();
    }
}