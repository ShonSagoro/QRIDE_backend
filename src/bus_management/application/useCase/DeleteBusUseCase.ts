import { BusInterface } from "../../domain/ports/BusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteBusUseCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async execute(uuidBus: string): Promise<BaseResponse>{
        await this.busInterface.delete(uuidBus);
        return new BaseResponse(null, "Bus successfully deleted", true, 200);
    }
}