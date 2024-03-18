import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class UpdateUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(uuid:string,user_history:UserHistory): Promise<UserHistory | null> {
        return this.userHistoryInteface.update(uuid, user_history);
    }
}