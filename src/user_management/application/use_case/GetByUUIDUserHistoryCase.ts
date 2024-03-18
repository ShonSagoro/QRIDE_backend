import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class GetByUUIDUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(uuid:string): Promise<UserHistory | null> {
        return this.userHistoryInteface.findByUUID(uuid);
    }
}