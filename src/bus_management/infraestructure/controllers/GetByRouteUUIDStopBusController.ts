import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { GetByRouteUUIDStopBusUseCase } from "../../application/useCase/GetByRouteUUIDStopBusUseCase";
import { Request, Response } from 'express';

export class GetByRouteUUIDStopBusController{
    constructor(readonly useCase: GetByRouteUUIDStopBusUseCase) {}

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