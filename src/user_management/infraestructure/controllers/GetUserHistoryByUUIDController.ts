import { GetByUUIDUserHistoryCase } from './../../application/use_case/GetByUUIDUserHistoryCase';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { UserHistoryResponse } from '../../application/dtos/response/UserHistoryResponse';

export class GetUserHistoryByUUIDController{
    constructor(readonly getByUUIDUserHistoryCase: GetByUUIDUserHistoryCase) { }

    async execute(req: any, res: any) {
        const uuid = req.params.uuid;
        try {
            let user_history = await this.getByUUIDUserHistoryCase.execute(uuid);
            if(user_history){
                let userHistoryResponse = new UserHistoryResponse(user_history);
                let baseResponse = new BaseResponse(userHistoryResponse, "User history found", true);
                res.status(200).json(baseResponse);
            }else{
                let baseResponse = new BaseResponse("Not found", "User history not found", false);
                res.status(401).send(baseResponse);
                return;
            }
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}