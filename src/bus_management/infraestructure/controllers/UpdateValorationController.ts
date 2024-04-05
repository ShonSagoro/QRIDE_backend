import { UpdateValorationRequest } from "../../application/dtos/request/UpdateValorationRequest";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { UpdateValorationUseCase } from "../../application/useCase/UpdateValorationUseCase";
import { parse } from "path";

export class UpdateValorationController{
    constructor(readonly useCase: UpdateValorationUseCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateValorationRequest(parseInt(data.raiting), data.comment );
        try{
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}