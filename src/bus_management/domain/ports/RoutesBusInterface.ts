import { RoutesBus } from './../entities/RoutesBus';
export interface RoutesBusInterface {
    create(routesBus: RoutesBus): Promise<RoutesBus | null>;
    update(uuid:string, routesBus: RoutesBus): Promise<RoutesBus | null>;
    delete(uuid: string): Promise<void>;
    list(): Promise<RoutesBus[] | null>;
    findByUUID(uuid: string): Promise<RoutesBus | null>;
}
