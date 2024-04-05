import { Coordinate } from '../entities/Coordinate';
import { Bus } from '../entities/Bus';
import { StopRoute } from '../entities/StopRoute';


export interface StopRouteInterface {
    create(bus: StopRoute[]): Promise<StopRoute[] | null>;
    delete(uuid: string): Promise<void>;
    findByAproximation(coordinate: Coordinate): Promise<StopRoute[] | null>;
    findByRouteUUID(uuidRoute: string): Promise<StopRoute[] | null>;
    findByUUID(uuid: string): Promise<StopRoute | null>;
    update(uuid:string, bus: StopRoute): Promise<StopRoute | null>;
}
