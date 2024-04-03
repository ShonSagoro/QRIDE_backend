import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { CreateRoutesBusRequest } from "../dtos/request/CreateRoutesBusRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { RoutesBusResponse } from "../dtos/response/RoutesBusResponse";

export class CreateRoutesBusCase {
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async execute(request: CreateRoutesBusRequest): Promise<BaseResponse> {
        let routesBus = new RoutesBus(request.origin, request.destination, request.region, request.uuidBus);
        let routesBusResult = await this.routesBusInterface.create(routesBus);
        if(routesBusResult){
            let routesBusResponse = new RoutesBusResponse(routesBusResult.uuid,routesBusResult.origin, routesBusResult.destination, routesBusResult.region, routesBusResult.uuidBus);
            return new BaseResponse(routesBusResponse, "Routes Bus successfully created", true, 200);
        }else{
            return new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false, 500);
        }
    }
}