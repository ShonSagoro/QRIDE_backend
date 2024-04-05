import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { CreateStopBusUseCase } from "../../application/useCase/CreateStopBusUseCase";
import { Request, Response } from 'express';
import { CreateStopRouteRequest } from '../../application/dtos/request/CreateStopRouteRequest';

export class CreateStopBusController{
    constructor(readonly useCase: CreateStopBusUseCase) {}

    async execute(req: Request, res: Response){
        const data = req.body;
        const request = new CreateStopRouteRequest(data.route, data.uuidRoute);
        try {
            const BaseResponse = await this.useCase.execute(request);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}