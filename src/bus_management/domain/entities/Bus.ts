import { v4 as uuidv4 } from 'uuid';

export class Bus{
    public uuid: string;
    public driver: string;
    public schedule: string;
    public boardingPrice: number;
   
    constructor(driver: string, schedule: string, boardingPrice: number, uuidRoutesBus: string) {
        this.uuid = uuidv4();
        this.driver = driver;
        this.schedule = schedule;
        this.boardingPrice = boardingPrice;
    }
}