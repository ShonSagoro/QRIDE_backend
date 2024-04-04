import { Valoration } from './../../domain/entities/Valoration';
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { UpdateValorationRequest } from '../dtos/request/UpdateValorationRequest';
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ValorationResponse } from '../dtos/response/ValorationResponse';

export class UpdateValorationUseCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }

    async execute(uuidValoration: string, request: UpdateValorationRequest):Promise<BaseResponse>{
        let valoration = new Valoration(request.raiting, request.comment, "", "");
        let valorationResult = await this.valorationInterface.update(uuidValoration, valoration);
        if (valorationResult){
            let valorationResponse = new ValorationResponse(valorationResult.uuid, valorationResult.raiting, valorationResult.comment, valorationResult.uuidUser, valorationResult.uuidBus);
            return new BaseResponse(valorationResponse, "Valoration successfully updated", true, 200);
        }else{
            return new BaseResponse(null, "Valoration not found", false, 404);
        }
    }
}