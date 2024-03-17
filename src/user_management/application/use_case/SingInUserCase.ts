import { User } from "../../domain/entities/User";
import { UserInterface } from "../../domain/ports/UserInterface";
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../../domain/services/TokenServices";
import { SingInUserRequest } from "../dtos/request/SingInUserRequest";
export class SingInUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(singInUserRequest:SingInUserRequest, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        return await this.userInterface.sing_in(singInUserRequest.email, singInUserRequest.password, encryptionService, tokenServices);
    }
} 