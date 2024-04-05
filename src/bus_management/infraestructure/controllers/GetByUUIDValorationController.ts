import { GetByUUIDValorationUseCase } from "../../application/useCase/GetByUUIDValorationUseCase";
import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class GetByUUIDValorationController{
    constructor(readonly useCase: GetByUUIDValorationUseCase){}

    async execute(req: Request, res: Response){
        const uuid = req.params.uuid;
        try {
            const BaseResponse = await this.useCase.execute(uuid);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}