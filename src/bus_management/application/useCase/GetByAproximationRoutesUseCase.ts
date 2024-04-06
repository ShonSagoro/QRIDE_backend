import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { SearchAproximationRequest } from "../dtos/request/SearchAproximationRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { RoutesBusResponse } from "../dtos/response/RoutesBusResponse";

export class GetByAproximationRoutesUseCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {

    }
    async execute(resquest: SearchAproximationRequest): Promise<BaseResponse>{
        let routesBus = await this.routesBusInterface.findByAproximation(resquest.routes);
        if (routesBus && routesBus.length > 0) {
            let routesBusResponses = routesBus.map((routesBus) => new RoutesBusResponse(routesBus.uuid, routesBus.number, routesBus.origin, routesBus.destination, routesBus.region, routesBus.uuidBus));
            return new BaseResponse(routesBusResponses, "Routes of a Bus successfully found", true, 200);
        } else{
            return new BaseResponse(null, "No se han encontrado rutas", false, 404);
        }
    }
}