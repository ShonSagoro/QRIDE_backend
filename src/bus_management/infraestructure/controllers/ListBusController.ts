import { ListBusUseCase } from './../../application/useCase/ListBusUseCase';
import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';

export class ListBusController{
    constructor(readonly useCase: ListBusUseCase){}

    async execute(req: Request, res: Response){
        try{
            const baseResponse = await this.useCase.execute();
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}