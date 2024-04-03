import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";

export class GetByUUIDBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async getByUUID(uuidBus: string): Promise<Bus | null>{
        return await this.busInterface.findByUUID(uuidBus);
    }
}