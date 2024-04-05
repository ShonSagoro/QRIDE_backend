import { UpdateBusRequest } from "../../application/dtos/request/UpdateBusRequest";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UpdateBusUseCase } from "../../application/useCase/UpdateBusUseCase";
import { Request, Response } from 'express';

export class UpdateBusController{
    constructor(readonly useCase: UpdateBusUseCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        const uuid = req.params.uuid;
        const request = new UpdateBusRequest(data.driver, data.schedule, parseInt(data.boardingPrice));
        try{
            const baseResponse = await this.useCase.execute(uuid, request);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }

}