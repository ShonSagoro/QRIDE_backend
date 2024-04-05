import { Contact } from "../../domain/entities/Contact";
import { Status } from "../../domain/entities/Status";
import { User } from "../../domain/entities/User";
import { Credentials } from "../../domain/entities/Credentials";
import { UserInterface } from "../../domain/ports/UserInterface";
import { SingUpUserRequest } from "../dtos/request/SingUpUserRequest";

export class SingUpUserCase {
    constructor(readonly userInterface: UserInterface) {}

    async execute(singUpUserRequest:SingUpUserRequest): Promise<User | null> {
        let contact = new Contact(singUpUserRequest.name, singUpUserRequest.lastName, singUpUserRequest.phoneNumber)
        let credentials= new Credentials(singUpUserRequest.email, singUpUserRequest.password)
        let status = new Status("", new Date())

        let user = new User(
            status,
            contact,
            credentials
        )
        return await this.userInterface.sing_up(user);
    }
}