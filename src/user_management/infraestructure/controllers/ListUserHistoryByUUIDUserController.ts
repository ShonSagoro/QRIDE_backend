import { UserHistoryResponse } from '../../application/dtos/response/UserHistoryResponse';
import { BaseResponse } from '../../application/dtos/response/baseResponse';
import { GetAllByUserHistoryCase } from './../../application/use_case/GetAllByUserHistoryCase';
export class ListUserHistoryByUUIDUserController{
    constructor(readonly getAllByUserHistoryCase: GetAllByUserHistoryCase) { }

    async execute(req: any, res: any) {
        const uuid = req.params.uuid;
        try {
            let user_history_list = await this.getAllByUserHistoryCase.executeByUserEmail(uuid);
            if(user_history_list && user_history_list.length > 0){
                let userHistoryResponseList = user_history_list.map(user_history => new UserHistoryResponse(user_history));
                let baseResponse = new BaseResponse(userHistoryResponseList, "User history found", true);
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