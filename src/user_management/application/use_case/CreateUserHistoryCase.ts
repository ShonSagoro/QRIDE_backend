import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";
import { CreateUserHistoryRequest } from "../dtos/request/CreateUserHistoryRequest";


export class CreateUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(user_history_request: CreateUserHistoryRequest): Promise<UserHistory | null> {
        let user_history = new UserHistory(user_history_request.origin, user_history_request.destiny, user_history_request.user_uuid);
        return this.userHistoryInteface.create(user_history);
    }
}