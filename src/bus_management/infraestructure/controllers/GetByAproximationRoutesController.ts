import { SearchAproximationRequest } from "../../application/dtos/request/SearchAproximationRequest";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { GetByAproximationRoutesUseCase } from "../../application/useCase/GetByAproximationRoutesUseCase";
import { Coordinate } from "../../domain/entities/Coordinate";
import { Request, Response } from 'express';

export class GetByAproximationRoutesController {
    constructor(readonly useCase: GetByAproximationRoutesUseCase) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        if (!data.latitude || !data.longitude) {
            const baseResponse = new BaseResponse(null, 'Bad request', false, 400);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
        if (isNaN(data.latitude) || isNaN(data.longitude)) {
            const baseResponse = new BaseResponse(null, 'Bad request', false, 400);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
        if (parseInt(data.latitude) > 90 || parseInt(data.latitude) < -90 || parseInt(data.longitude) > 180 || parseInt(data.longitude) < -180) {
            const baseResponse = new BaseResponse(null, 'Bad request', false, 400);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
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