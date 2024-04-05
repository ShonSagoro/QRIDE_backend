import { Request, Response } from 'express';
import { GetByAproximationStopBusUseCase } from '../../application/useCase/GetByAproximationStopBusUseCase';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { SearchAproximationRequest } from '../../application/dtos/request/SearchAproximationRequest';
import { Coordinate } from '../../domain/entities/Coordinate';

export class GetByAproximationStopBusController{
    constructor(readonly useCase: GetByAproximationStopBusUseCase) {}

    async execute(req: Request, res: Response){
        const data = req.body;
        const request = new SearchAproximationRequest(new Coordinate(parseInt(data.latitude), parseInt(data.longitude)));
        try {
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse(null, 'Internal server error', false, 500);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}