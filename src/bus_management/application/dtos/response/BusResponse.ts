export class BusResponse {
    public uuid:string;
    public driver: string;
    public schedule: string;
    public boardingPrice: number;

    constructor(uuid:string , driver: string, schedule: string, boardingPrice: number) {
        this.uuid = uuid;
        this.driver = driver;
        this.schedule = schedule;
        this.boardingPrice = boardingPrice;
    }
}