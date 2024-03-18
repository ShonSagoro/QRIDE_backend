import { UserHistoryResponse } from './../../application/dtos/response/UserHistoryResponse';
import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import { CreateUserHistoryCase } from './../../application/use_case/CreateUserHistoryCase';
import { Coordinate } from '../../domain/entities/Coordinate';
import { CreateUserHistoryRequest } from '../../application/dtos/request/CreateUserHistoryRequest';
export class CreateUserHistoryController {
    constructor(readonly createUserHistoryCase: CreateUserHistoryCase) { }

    async execute(req: any, res: any) {
        const data = req.body;
        try {
            let origin = new Coordinate(data.origin.latitude, data.origin.longitude);
            let destination = new Coordinate(data.destination.latitude, data.destination.longitude);
            let userHistoryRequest = new CreateUserHistoryRequest(origin, destination, data.user_uuid);
            let userhistory = await this.createUserHistoryCase.execute(userHistoryRequest);
            if (userhistory) {
                let userHistoryResponse = new UserHistoryResponse(userhistory);
                let baseResponse = new BaseResponse(userHistoryResponse, "User history created", true);
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