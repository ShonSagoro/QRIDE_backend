export class UpdateValorationRequest {
    public raiting: number;
    public comment: string;

    constructor( raiting: number, comment: string) {
        this.raiting = raiting;
        this.comment = comment;
    }
}