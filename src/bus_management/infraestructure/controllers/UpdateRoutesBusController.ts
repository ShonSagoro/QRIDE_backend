import { UpdateRoutesBusUseCase } from "../../application/useCase/UpdateRoutesBusUseCase";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';
import { UpdateRoutesBusRequest } from "../../application/dtos/request/UpdateRoutesBusRequest";

export class UpdateRoutesBusController{
    constructor(readonly useCase: UpdateRoutesBusUseCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateRoutesBusRequest(data.origin, data.destination, data.busId, data.routeId);
        try{
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
} 