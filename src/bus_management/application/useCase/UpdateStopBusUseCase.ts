import { StopRoute } from './../../domain/entities/StopRoute';
import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { UpdateStopRouteRequest } from "../dtos/request/UpdateStopRouteRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteResponse } from '../dtos/response/StopRouteResponse';

export class UpdateStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }
    async execute(uuid:string, resquest: UpdateStopRouteRequest): Promise<BaseResponse>{
        if (resquest.route.latitude < -90 || resquest.route.latitude > 90 || resquest.route.longitude < -180 || resquest.route.longitude > 180) {
            return new BaseResponse(null, "Invalid coordinates, must be 90 to -90 in latitude and 180 to -180 en longitude", false, 400);
        }
        let stopRoute = new StopRoute(resquest.route, resquest.uuidRoute);
        let result = await this.stopRouteInterface.update(uuid, stopRoute);
        if (result) {
            let response = new StopRouteResponse(result);
            return new BaseResponse(response, "Stop route of a Bus successfully updated", true, 200);
        } else{
            return new BaseResponse(null, "No se han encontrado rutas", false, 404);
        }
    }

}