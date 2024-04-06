import { Valoration } from './../../domain/entities/Valoration';
import { ValorationInterface } from './../../domain/ports/ValorationInterface';
import { CreateValorationRequest } from '../dtos/request/CreateValorationRequest';
import { BaseResponse } from '../dtos/response/BaseResponse';
import { ValorationResponse } from '../dtos/response/ValorationResponse';
export class CreateValorationUseCase {
    constructor(readonly valorationInterface: ValorationInterface) {
        
    }
    async execute(request: CreateValorationRequest): Promise<BaseResponse> {
        if (!request.raiting) {
            return new BaseResponse(null, "El rating no puede estar vacío", false, 400);
        }
        if (request.raiting < 1 || request.raiting > 5) {
            return new BaseResponse(null, "La calificación debe estar entre 1 y 5", false, 400);
        }
        if (request.comment.length > 300) {
            return new BaseResponse(null, "El comentario no puede tener más de 300 caracteres", false, 400);
        }
        if(request.uuidUser === "" || request.uuidBus === ""){
            return new BaseResponse(null, "El usuario y el bus son requeridos", false, 400);
        }
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