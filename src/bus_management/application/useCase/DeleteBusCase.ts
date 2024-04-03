import { BusInterface } from "../../domain/ports/BusInterface";

export class DeleteBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async delete(uuidBus: string): Promise<void>{
        await this.busInterface.delete(uuidBus);
    }
}