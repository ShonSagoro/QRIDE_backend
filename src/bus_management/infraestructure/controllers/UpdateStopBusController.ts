import { UpdateStopRouteRequest } from "../../application/dtos/request/UpdateStopRouteRequest";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateStopBusUseCase } from "../../application/useCase/UpdateStopBusUseCase";
import { Request, Response } from 'express';
import { Coordinate } from "../../domain/entities/Coordinate";

export class UpdateStopBusController{
    constructor(readonly useCase: UpdateStopBusUseCase) {}

    async execute(req: Request, res: Response){
        const uuid = req.params.uuid;
        const data = req.body;
        let request = new UpdateStopRouteRequest(data.uuidRoute, new Coordinate(parseInt(data.route.latitude), parseInt(data.route.longitude)));
        try {
            const BaseResponse = await this.useCase.execute(uuid, request);
            res.status(BaseResponse.statusCode).json(BaseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}