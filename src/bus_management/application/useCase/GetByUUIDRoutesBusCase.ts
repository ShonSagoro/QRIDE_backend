import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class GetByUUIDRoutesBusCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async execute(uuidBus: string): Promise<BaseResponse>{
        let routesBus = await this.routesBusInterface.findByUUID(uuidBus);
        if (routesBus){
            return new BaseResponse(routesBus, "Routes Bus successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Routes Bus not found", false, 404);
        }
    }
}