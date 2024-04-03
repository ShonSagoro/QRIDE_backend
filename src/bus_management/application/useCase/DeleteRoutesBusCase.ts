import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";

export class DeleteRoutesBusCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async delete(uuidBus: string): Promise<void>{
        await this.routesBusInterface.delete(uuidBus);
    }
}