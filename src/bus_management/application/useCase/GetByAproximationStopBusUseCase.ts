import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { SearchAproximationRequest } from "../dtos/request/SearchAproximationRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteResponse } from "../dtos/response/StopRouteResponse";

export class GetByAproximationStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }
    async execute(resquest: SearchAproximationRequest): Promise<BaseResponse>{
        let stopRoutes = await this.stopRouteInterface.findByAproximation(resquest.routes);
        if (stopRoutes && stopRoutes.length > 0) {
            let stopRoutesResponses = stopRoutes.map((stopRoute) => new StopRouteResponse(stopRoute));
            return new BaseResponse(stopRoutesResponses, "Stop routes of a Bus successfully found", true, 200);
        } else{
            return new BaseResponse(null, "No se han encontrado rutas", false, 404);
        }
    }

}