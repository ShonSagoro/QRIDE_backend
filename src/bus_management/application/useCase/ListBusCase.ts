import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { BusResponse } from "../dtos/response/BusResponse";

export class ListBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async execute(): Promise<BaseResponse>{
        let buses = await this.busInterface.list();
        if (buses){
            let busesResponse = buses.map((bus: Bus) => {
                return new BusResponse(bus.uuid, bus.driver, bus.schedule, bus.boardingPrice);
            });
            return new BaseResponse(busesResponse, "Buses successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Buses not found", false, 404);
        }
    }
}