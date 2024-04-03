import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";

export class GetByUUIDUserValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async getByUUIDUser(uuidUser: string): Promise<Valoration[] | null> {
        return await this.valorationInterface.findByUserUUID(uuidUser);
    }
}