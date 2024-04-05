import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { CreateStopRouteRequest } from "../dtos/request/CreateStopRouteRequest";
import { StopRoute } from "../../domain/entities/StopRoute";
import { Coordinate } from "../../domain/entities/Coordinate";
import { StopRouteResponse } from "../dtos/response/StopRouteResponse";

export class CreateStopBusUseCase {
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }
    
    async execute(request: CreateStopRouteRequest): Promise<BaseResponse> {
        let stopRoutes = request.routes.map((route) => new StopRoute(new Coordinate(route.latitude, route.longitude), request.uuidRoute));
        if (stopRoutes.length === 0) {
            return new BaseResponse(null, "No se han proporcionado rutas", false, 400);
        }
        let stopRoutesResults = await this.stopRouteInterface.create(stopRoutes);
        if (stopRoutesResults && stopRoutesResults.length > 0 && stopRoutesResults?.length === stopRoutes.length) {
            let stopRoutesResponses = stopRoutesResults.map((stopRoute) => new StopRouteResponse(stopRoute));
            return new BaseResponse(stopRoutesResponses, "Stop routes of a Bus successfully created", true, 200);
        } else {
            return new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false, 500);
        }
    }
}