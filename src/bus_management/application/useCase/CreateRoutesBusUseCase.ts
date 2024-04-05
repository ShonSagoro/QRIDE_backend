import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { CreateRoutesBusRequest } from "../dtos/request/CreateRoutesBusRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { RoutesBusResponse } from "../dtos/response/RoutesBusResponse";

export class CreateRoutesBusUseCase {
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async execute(request: CreateRoutesBusRequest): Promise<BaseResponse> {
        if (request.origin.latitude > 90 || request.origin.latitude < -90 || request.origin.longitude > 180 || request.origin.longitude < -180) {
            return new BaseResponse(null, "Invalid origin coordinate, must be 90 to -90 in latitude and 180 to -180 en longitude", false, 400);
        }
        let routesBus = new RoutesBus(request.number,request.origin, request.destination, request.region, request.uuidBus);
        let routesBusResult = await this.routesBusInterface.create(routesBus);
        if(routesBusResult){
            let routesBusResponse = new RoutesBusResponse(routesBusResult.uuid,routesBusResult.number,routesBusResult.origin, routesBusResult.destination, routesBusResult.region, routesBusResult.uuidBus);
            return new BaseResponse(routesBusResponse, "Routes Bus successfully created", true, 200);
        }else{
            return new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false, 500);
        }
    }
}