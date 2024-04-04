import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { UpdateRoutesBusRequest } from "../dtos/request/UpdateRoutesBusRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { RoutesBusResponse } from "../dtos/response/RoutesBusResponse";

export class UpdateRoutesBusUseCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }

    async execute(uuidBus: string, request: UpdateRoutesBusRequest): Promise<BaseResponse>{
        let routesBus = new RoutesBus(request.origin, request.destination, request.region, request.uuidBus);
        let routesBusResult = await this.routesBusInterface.update(uuidBus, routesBus);
        if (routesBusResult){
            let routesBusResponse = new RoutesBusResponse(routesBusResult.uuid, routesBusResult.origin, routesBusResult.destination, routesBusResult.region, routesBusResult.uuidBus);
            return new BaseResponse(routesBusResponse, "Routes Bus successfully updated", true, 200);
        }else{
            return new BaseResponse(null, "Routes Bus not found", false, 404);
        }
    }
}