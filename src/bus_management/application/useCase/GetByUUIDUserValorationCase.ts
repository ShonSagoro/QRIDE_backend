import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ValorationResponse } from "../dtos/response/ValorationResponse";

export class GetByUUIDUserValorationCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(uuidUser: string): Promise<BaseResponse> {
        let valorationsResult= await this.valorationInterface.findByUserUUID(uuidUser);
        if (valorationsResult && valorationsResult.length > 0) {
            let valorationResponses = valorationsResult.map((valoration: Valoration) => {
                new ValorationResponse(valoration.uuid ,valoration.raiting, valoration.comment, valoration.uuidUser, valoration.uuidBus);
            });
            return new BaseResponse(valorationResponses, "Valorations successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Valorations not found", false, 404);
        }
    }
}