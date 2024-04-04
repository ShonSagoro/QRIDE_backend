import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteRoutesBusUseCase{
    constructor(readonly routesBusInterface: RoutesBusInterface) {
        
    }
    async execute(uuidBus: string): Promise<BaseResponse>{
        await this.routesBusInterface.delete(uuidBus);
        return new BaseResponse(null, "Routes Bus successfully deleted", true, 200);
    }
}