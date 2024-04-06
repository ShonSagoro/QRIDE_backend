import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { RoutesBusResponse } from "../dtos/response/RoutesBusResponse";

export class ListRoutesBusUseCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async execute(): Promise<BaseResponse>{
        let rotesBuses = await this.routesBusInterface.list();
        if (rotesBuses){
            let routesBusesResponse = rotesBuses.map((routesBus: RoutesBus) => {
                return new RoutesBusResponse(routesBus.uuid, routesBus.number, routesBus.origin, routesBus.destination, routesBus.region, routesBus.uuidBus);
            });
            return new BaseResponse(routesBusesResponse, "Routes Bus successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Routes Bus not found", false, 404);
        }
    }
}