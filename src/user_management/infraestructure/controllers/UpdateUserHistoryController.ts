import { UserHistoryResponse } from './../../application/dtos/response/UserHistoryResponse';
import { BaseResponse } from '../../application/dtos/response/baseResponse';
import { Coordinate } from '../../domain/entities/Coordinate';
import { CreateUserHistoryRequest } from '../../application/dtos/request/CreateUserHistoryRequest';
import { UpdateUserHistoryCase } from '../../application/use_case/UpdateUserHistoryCase';
export class UpdateUserHistoryController {
    constructor(readonly updateUserHistoryCase: UpdateUserHistoryCase) { }

    async execute(req: any, res: any) {
        const data = req.body;
        try {
            let origin = new Coordinate(data.origin.latitude, data.origin.longitude);
            let destination = new Coordinate(data.destination.latitude, data.destination.longitude);
            let userHistoryRequest = new CreateUserHistoryRequest(origin, destination, data.user_uuid);
            let userhistory = await this.updateUserHistoryCase.execute(data.uuid,userHistoryRequest);
            if (userhistory) {
                let userHistoryResponse = new UserHistoryResponse(userhistory);
                let baseResponse = new BaseResponse(userHistoryResponse, "User history updated", true);
                res.status(200).json(baseResponse);
            } else {
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