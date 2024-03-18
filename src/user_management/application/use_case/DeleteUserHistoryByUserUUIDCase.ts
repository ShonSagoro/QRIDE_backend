import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";


export class DeleteUserHistoryByUserUUIDCase {
    constructor(readonly userHistoryInteface: UserHistoryInterface) {}

    async execute(uuid: string): Promise<void> {
        this.userHistoryInteface.deleteByUserUUID(uuid);
    }
}