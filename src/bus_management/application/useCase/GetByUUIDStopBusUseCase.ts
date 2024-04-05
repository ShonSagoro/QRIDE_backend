import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteResponse } from "../dtos/response/StopRouteResponse";

export class GetByUUIDStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }

    async execute(uuid: string): Promise<BaseResponse>{
        let result = await this.stopRouteInterface.findByUUID(uuid);
        if (result) {
            let response = new StopRouteResponse(result);
            return new BaseResponse(response, "Stop route of a Bus successfully found", true, 200);
        } else{
            return new BaseResponse(null, "No se han encontrado rutas", false, 404);
        }
    }
}