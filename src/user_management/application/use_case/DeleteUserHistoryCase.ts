import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class DeleteUserHistoryCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(uuid: string): Promise<void> {
        this.userHistoryInteface.deleteByUUID(uuid);
    }
}