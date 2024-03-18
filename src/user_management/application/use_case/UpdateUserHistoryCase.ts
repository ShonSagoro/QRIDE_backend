import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";
import { UpdateUserHistoryRequest } from "../dtos/request/UpdateUserHistoryRequest";


export class UpdateUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(uuid:string,user_history_update:UpdateUserHistoryRequest): Promise<UserHistory | null> {
        let user_history = new UserHistory(user_history_update.origin, user_history_update.destiny, user_history_update.user_uuid);
        return this.userHistoryInteface.update(uuid, user_history);
    }
}