import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";

export class ListValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }

    async listValoration(): Promise<Valoration[] | null>{
        return await this.valorationInterface.list();
    }
}