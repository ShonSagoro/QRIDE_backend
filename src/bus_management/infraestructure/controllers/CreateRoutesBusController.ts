import { Request, Response } from 'express';
import { CreateRoutesBusCase } from '../../application/useCase/CreateRoutesBusCase';
import { CreateRoutesBusRequest } from '../../application/dtos/request/CreateRoutesBusRequest';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';


export class CreateRoutesBusController{
    constructor(readonly createRoutesBusCase: CreateRoutesBusCase) {}

    async createBus(req: Request, res: Response){
        const data = req.body;
        const request = new CreateRoutesBusRequest(data.origin, data.destination, data.region, data.uuidBus);
        try {
            const BaseResponse = await this.createRoutesBusCase.execute(request);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}