import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";

export class GetByUUIDValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async getByUUID(uuidValoration: string): Promise<Valoration | null>{
        return await this.valorationInterface.findByUUID(uuidValoration);
    }
}