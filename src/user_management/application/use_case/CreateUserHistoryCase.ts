import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class CreateUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(user_history:UserHistory): Promise<UserHistory | null> {
        return this.userHistoryInteface.create(user_history);
    }
}