import { Coordinate } from "./Coordinate";
import { v4 as uuidv4 } from 'uuid';

export class Valoration {
    public uuid: string;
    public raiting: number;
    public comment: string;
    public uuidUser: string;
    public uuidBus: string;

    constructor( raiting: number, comment: string, uuidUser: string, uuidBus: string) {
        this.uuid = uuidv4();
        this.raiting = raiting;
        this.comment = comment;
        this.uuidUser = uuidUser;
        this.uuidBus = uuidBus;
    }
    
}