import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { StopRouteResponse } from "../dtos/response/StopRouteResponse";

export class GetByRouteUUIDStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }

    async execute(uuid: string): Promise<BaseResponse>{
        let result = await this.stopRouteInterface.findByRouteUUID(uuid);
        if (result) {
            let responses = result.map((stopRoute) => new StopRouteResponse(stopRoute));
            return new BaseResponse(responses, "Stops route of a Bus successfully found", true, 200);
        } else{
            return new BaseResponse(null, "No se han encontrado rutas", false, 404);
        }
    }
}