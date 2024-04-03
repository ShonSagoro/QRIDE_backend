import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { CreateBusRequest } from "../dtos/request/CreateBusRequest";

export class CreateBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async create(request: CreateBusRequest): Promise<Bus | null>{
        let bus = new Bus(request.driver, request.schedule, request.boardingPrice);
        return await this.busInterface.create(bus);
    }

}