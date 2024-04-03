import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { Valoration } from '../../domain/entities/Valoration';
import { UpdateValorationRequest } from '../dtos/request/UpdateValorationRequest';

export class UpdateValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }

    async updateValoration(uuidValoration: string, request: UpdateValorationRequest):Promise<Valoration | null>{
        let valoration = new Valoration(request.raiting, request.comment, "", "");
        return await this.valorationInterface.update(uuidValoration, valoration);
    }
}