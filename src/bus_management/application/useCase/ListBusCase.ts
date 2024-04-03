import { BusInterface } from "../../domain/ports/BusInterface";

export class ListBusCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async list(): Promise<any>{
        return await this.busInterface.list();
    }
}