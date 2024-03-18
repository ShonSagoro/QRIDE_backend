import { UserHistory } from "../../domain/entities/UserHistory";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class GetAllByUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async executeByUserEmail(email: string): Promise<UserHistory[] | null> {
        return this.userHistoryInteface.findAllByUserEmail(email);
    }

    async executeByUserUUID(uuid:string): Promise<UserHistory[] | null> {
        return this.userHistoryInteface.findAllByUserUUID(uuid);
    }
}