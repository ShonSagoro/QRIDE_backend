import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { UpdateBusRequest } from "../dtos/request/UpdateBusRequest";

export class UpdateBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async update(uuidBus:string, requets:UpdateBusRequest): Promise<Bus|null>{
        let bus = new Bus(requets.driver, requets.schedule, requets.boardingPrice);
        return await this.busInterface.update(uuidBus, bus);
    }
}