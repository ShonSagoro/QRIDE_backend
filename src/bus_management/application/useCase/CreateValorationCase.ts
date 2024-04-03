import { Valoration } from './../../domain/entities/Valoration';
import { ValorationInterface } from './../../domain/ports/ValorationInterface';
import { CreateValorationRequest } from '../dtos/request/CreateValorationRequest';
export class CreateValorationCase {
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async createValoration(request: CreateValorationRequest): Promise<Valoration | null> {
        let valoration = new Valoration(request.raiting, request.comment, request.uuidUser, request.uuidBus);
        return await this.valorationInterface.create(valoration);
    }
}