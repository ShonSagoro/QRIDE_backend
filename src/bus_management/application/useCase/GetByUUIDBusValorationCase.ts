import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";

export class GetByUUIDBusValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async getByUUIDBus(uuidBus: string): Promise<Valoration[] | null> {
        return await this.valorationInterface.findByBusUUID(uuidBus);
    }
}