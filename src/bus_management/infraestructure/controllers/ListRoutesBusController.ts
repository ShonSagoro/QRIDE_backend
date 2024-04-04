import { ListRoutesBusUseCase } from "../../application/useCase/ListRoutesBusUseCase";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { Request, Response } from 'express';

export class ListRoutesBusController{
    constructor(readonly useCase: ListRoutesBusUseCase) {}

    async execute(req: Request, res: Response) {
        try {
            const baseResponse = await this.useCase.execute();
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}