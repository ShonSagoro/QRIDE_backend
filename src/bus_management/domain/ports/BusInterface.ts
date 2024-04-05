import { Bus } from './../entities/Bus';


export interface BusInterface {
    create(bus: Bus): Promise<Bus | null>;
    update(uuid:string, bus: Bus): Promise<Bus | null>;
    delete(uuid: string): Promise<void>;
    list(): Promise<Bus[] | null>;
    findByUUID(uuid: string): Promise<Bus | null>;
}
