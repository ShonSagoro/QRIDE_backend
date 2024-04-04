import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";

export class DeleteValorationUseCase {
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(uuid:string): Promise<BaseResponse> {
        await this.valorationInterface.delete(uuid);
        return new BaseResponse(null, "Valoration successfully deleted", true, 200);
    }
}