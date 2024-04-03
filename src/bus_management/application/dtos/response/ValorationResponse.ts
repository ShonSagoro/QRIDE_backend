export class ValorationResponse {
    public uuid: string;
    public raiting: number;
    public comment: string;
    public uuidUser: string;
    public uuidBus: string;

    constructor( uuid:string, raiting: number, comment: string, uuidUser: string, uuidBus: string) {
        this.uuid = uuid;
        this.raiting = raiting;
        this.comment = comment;
        this.uuidUser = uuidUser;
        this.uuidBus = uuidBus;
    }
}