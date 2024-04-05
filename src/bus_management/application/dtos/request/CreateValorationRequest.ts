export class CreateValorationRequest {
    public raiting: number;
    public comment: string;
    public uuidUser: string;
    public uuidBus: string;

    constructor( raiting: number, comment: string, uuidUser: string, uuidBus: string) {
        this.raiting = raiting;
        this.comment = comment;
        this.uuidUser = uuidUser;
        this.uuidBus = uuidBus;
    }
}