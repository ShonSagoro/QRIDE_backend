import { BaseResponse } from "../../application/dtos/response/baseResponse";
import { DeleteUserHistoryByUserUUIDCase } from "../../application/use_case/DeleteUserHistoryByUserUUIDCase";

export class DeleteUserHistoryByUserUUIDController{
    constructor(readonly deleteUserHistoryByUserUUIDCase: DeleteUserHistoryByUserUUIDCase) { }

    async execute(req: any, res: any) {
        const uuid = req.params.uuid;
        try {
            await this.deleteUserHistoryByUserUUIDCase.execute(uuid);
            let baseResponse = new BaseResponse("Successful","User history deleted", true);
            res.status(200).json(baseResponse);
        } catch (error) {
            let baseResponse = new BaseResponse("Error", "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}