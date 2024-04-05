import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ValorationResponse } from "../dtos/response/ValorationResponse";

export class GetByUUIDUserValorationUseCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(uuidUser: string): Promise<BaseResponse> {
        let valorations= await this.valorationInterface.findByUserUUID(uuidUser);
        if (valorations && valorations.length > 0) {
            let valorationsResponse = valorations.map((valoration: Valoration) => {
                return new ValorationResponse(valoration.uuid ,valoration.raiting, valoration.comment, valoration.uuidUser, valoration.uuidBus);
            });
            return new BaseResponse(valorationsResponse, "Valorations successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Valorations not found", false, 404);
        }
    }
}