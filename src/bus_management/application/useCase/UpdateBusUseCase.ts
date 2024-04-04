import { BusResponse } from './../dtos/response/BusResponse';
import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { UpdateBusRequest } from "../dtos/request/UpdateBusRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class UpdateBusUseCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async execute(uuidBus:string, requets:UpdateBusRequest): Promise<BaseResponse>{
        let bus = new Bus(requets.driver, requets.schedule, requets.boardingPrice);
        let busResult = await this.busInterface.update(uuidBus, bus);
        if (busResult){
            let busResponse= new BusResponse(busResult.uuid, busResult.driver, busResult.schedule, busResult.boardingPrice);
            return new BaseResponse(busResponse, "Bus successfully updated", true, 200);
        }else{
            return new BaseResponse(null, "Bus not found", false, 404);
        }
    }
}