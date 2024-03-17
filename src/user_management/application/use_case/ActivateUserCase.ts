import { UserInterface } from "../../domain/ports/UserInterface";

export class ActivateUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<void> {
        await this.userInterface.updateUserVerifiedAt(uuid);
    }
}