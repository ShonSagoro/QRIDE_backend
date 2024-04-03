import { CreateBusRequest } from '../../application/dtos/request/CreateBusRequest';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateBusCase } from './../../application/useCase/CreateBusCase';
import { Request, Response } from 'express';

export class CreateBusController{
    constructor(readonly createBusCase: CreateBusCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        const request = new CreateBusRequest(data.driver, data.schedule, parseInt(data.boardingPrice));
        try{
            const baseResponse = await this.createBusCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}