import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteStopBusUseCase{
    constructor(readonly stopRouteInterface: StopRouteInterface) {

    }
    async execute(uuid: string): Promise<BaseResponse>{
        await this.stopRouteInterface.delete(uuid);
        return new BaseResponse(null, "Bus successfully deleted", true, 200);
    }
}