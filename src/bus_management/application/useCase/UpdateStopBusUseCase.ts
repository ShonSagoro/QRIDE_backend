import { StopRoute } from './../../domain/entities/StopRoute';
import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { UpdateStopRouteRequest } from "../dtos/request/UpdateStopRouteRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteResponse } from '../dtos/response/StopRouteResponse';

export class UpdateStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }
    async execute(uuid:string, resquest: UpdateStopRouteRequest): Promise<BaseResponse>{
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