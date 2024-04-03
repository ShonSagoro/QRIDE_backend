export class UpdateBusRequest {
    public driver: string;
    public schedule: string;
    public boardingPrice: number;

    constructor(driver: string, schedule: string, boardingPrice: number) {
        this.driver = driver;
        this.schedule = schedule;
        this.boardingPrice = boardingPrice;
    }
}