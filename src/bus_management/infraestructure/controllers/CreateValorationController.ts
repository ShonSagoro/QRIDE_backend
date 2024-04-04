import { CreateValorationRequest } from '../../application/dtos/request/CreateValorationRequest';
import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateValorationUseCase } from '../../application/useCase/CreateValorationUseCase';

export class CreateValorationController {
    constructor(readonly useCase: CreateValorationUseCase) {}

    async execute(req: Request, res: Response) {
        const data = req.body;
        const request = new CreateValorationRequest(parseInt(data.raiting), data.comment, data.uuidUser, data.uuidBus);
        try {
            const baseResponse = await this.useCase.execute(data);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }

}