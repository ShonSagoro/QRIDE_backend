import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { ValorationResponse } from "../dtos/response/ValorationResponse";

export class GetByUUIDBusValorationUseCase{
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(uuidBus: string): Promise<BaseResponse> {
        let valorationsResult= await this.valorationInterface.findByBusUUID(uuidBus);
        if (valorationsResult && valorationsResult.length > 0) {
            let valorationsResponse = valorationsResult.map((valoration: Valoration) => {
                return new ValorationResponse(valoration.uuid ,valoration.raiting, valoration.comment, valoration.uuidUser, valoration.uuidBus);
            });
            return new BaseResponse(valorationsResponse, "Valorations successfully found", true, 200);
        }else{
            return new BaseResponse(null, "Valorations not found", false, 404);
        }
    }
}