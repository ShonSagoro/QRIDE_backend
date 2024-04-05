import { ValorationResponse } from './../dtos/response/ValorationResponse';
import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class GetByUUIDValorationUseCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(uuidValoration: string): Promise<BaseResponse>{
        let valoration = await this.valorationInterface.findByUUID(uuidValoration);
        let baseResponse = null;
        if (valoration){
            let valorationResponse = new ValorationResponse(valoration.uuid ,valoration.raiting, valoration.comment, valoration.uuidUser, valoration.uuidBus);
            baseResponse = new BaseResponse(valorationResponse, "Valoration successfully found", true, 200);
        }else{
            baseResponse = new BaseResponse(null, "Valoration not found", false, 404);
        }
        return baseResponse;
    }
}