import { ValorationInterface } from "../../domain/ports/ValorationInterface";

export class DeleteValorationCase {
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async delete(uuid:string): Promise<void> {
        return await this.valorationInterface.delete(uuid);
    }
}