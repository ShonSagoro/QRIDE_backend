import { Valoration } from "../entities/Valoration";

export interface ValorationInterface {
    create(valoration: Valoration): Promise<Valoration | null>;
    update(uuid:string, valoration: Valoration): Promise<Valoration | null>;
    delete(uuid: string): Promise<void>;
    list(): Promise<Valoration[] | null>;
    findByUUID(uuid: string): Promise<Valoration | null>;
    findByUserUUID(user_uuid: string): Promise<Valoration[] | null>;
    findByBusUUID(bus_uuid: string): Promise<Valoration[] | null>;
}
