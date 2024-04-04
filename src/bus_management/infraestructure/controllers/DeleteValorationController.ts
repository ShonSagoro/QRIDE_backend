import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { Request, Response } from 'express';
import { DeleteValorationUseCase } from "../../application/useCase/DeleteValorationUseCase";

export class DeleteValorationController{
    constructor(readonly useCase: DeleteValorationUseCase) {}

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