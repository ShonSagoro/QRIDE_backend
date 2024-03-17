import { UserInterface } from "../../domain/ports/UserInterface";

export class SingOutUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(uuid:string): Promise<void> {
        return await this.userInterface.sing_out(uuid);
    }
}