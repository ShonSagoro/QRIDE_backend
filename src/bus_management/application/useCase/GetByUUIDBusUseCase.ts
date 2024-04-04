import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { BusResponse } from "../dtos/response/BusResponse";

export class GetByUUIDBusUseCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async execute(uuidBus: string): Promise<BaseResponse>{
        let bus = await this.busInterface.findByUUID(uuidBus);
        if(bus){
            let busResponse = new BusResponse(bus.uuid, bus.driver, bus.schedule, bus.boardingPrice);
            return new BaseResponse(busResponse, "Bus successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Bus not found", false, 404);
        }
    }
}