import { User } from "../../../domain/entities/User";

export class UserResponse {
    uuid: string;
    name: string;
    email: string;
    lastName: string;
    phoneNumber: string;

    constructor(user: User) {
        this.uuid = user.uuid;
        this.name = user.contact.name;
        this.email = user.credentials.email;
        this.lastName = user.contact.lastname;
        this.phoneNumber = user.contact.phoneNumber;
    }
}