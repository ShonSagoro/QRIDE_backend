import { Valoration } from './../../domain/entities/Valoration';
import { ValorationInterface } from './../../domain/ports/ValorationInterface';
import { CreateValorationRequest } from '../dtos/request/CreateValorationRequest';
import { BaseResponse } from '../dtos/response/BaseResponse';
import { ValorationResponse } from '../dtos/response/ValorationResponse';
export class CreateValorationCase {
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(request: CreateValorationRequest): Promise<BaseResponse> {
        let valoration = new Valoration(request.raiting, request.comment, request.uuidUser, request.uuidBus);
        let valorationResult = await this.valorationInterface.create(valoration);
        if (valorationResult) {
            let valorationResponse = new ValorationResponse(valorationResult.uuid,valorationResult.raiting, valorationResult.comment, valorationResult.uuidUser, valorationResult.uuidBus);
            return new BaseResponse(valorationResponse, "Valoration successfully created", true, 200);
        }else{ 
            return new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false, 500);
        }
    }
}