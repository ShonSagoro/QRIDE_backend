import { Request, Response } from 'express';
import { CreateRoutesBusRequest } from '../../application/dtos/request/CreateRoutesBusRequest';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateRoutesBusUseCase } from '../../application/useCase/CreateRoutesBusUseCase';


export class CreateRoutesBusController{
    constructor(readonly useCase: CreateRoutesBusUseCase) {}

    async execute(req: Request, res: Response){
        const data = req.body;
        const request = new CreateRoutesBusRequest(parseInt(data.number),data.origin, data.destination, data.region, data.uuidBus);
        try {
            const BaseResponse = await this.useCase.execute(request);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}