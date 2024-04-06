import { RoutesBus } from "../../domain/entities/RoutesBus";
import { RoutesBusInterface } from "../../domain/ports/RoutesBusInterface";
import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import { Coordinate } from "../../domain/entities/Coordinate";
import { MongoStopRouteRepository } from "./MongoStopRoutesjRepository";
import { StopRoute } from "../../domain/entities/StopRoute";

export class MongoRoutesBusRepository implements RoutesBusInterface {
    private collection!: Collection | any;
    private _stopRouteRepository: MongoStopRouteRepository | null = null;

    get stopRouteRepository(): MongoStopRouteRepository {
        if (!this._stopRouteRepository) {
            this._stopRouteRepository = new MongoStopRouteRepository();
        }
        return this._stopRouteRepository;
    }

    constructor() {
        this.stopRouteRepository;
        this.initializeCollection();
    }
    async findByAproximation(coordinate: Coordinate): Promise<RoutesBus[] | null> {
        try {
            const result = await this.stopRouteRepository.findByAproximation(coordinate);
            if (Array.isArray(result)) {
                let uuids = [...new Set(result.map((element) => element.uuidRoute))]; console.log(uuids); if (uuids) {
                    const result_routes = await this.collection.find({ uuid: { $in: uuids } }).toArray();
                    if (result_routes) {
                        return result_routes.map((element: any) => {
                            let origin = new Coordinate(element.origin.latitude, element.origin.longitude);
                            let destination = new Coordinate(element.destination.latitude, element.destination.longitude);
                            let routesBus = new RoutesBus(element.number, origin, destination, element.region, element.uuidBus);
                            routesBus.uuid = element.uuid;
                            return routesBus;
                        });
                    }
                }
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);

        }
    }

    async create(routesBus: RoutesBus): Promise<RoutesBus | null> {
        try {
            this.collection.insertOne(routesBus);
            return Promise.resolve(routesBus);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async update(uuid: string, routesBus: RoutesBus): Promise<RoutesBus | null> {
        try {
            let routesBus_exist = await this.findByUUID(uuid);
            if (routesBus_exist) {
                this.collection.updateOne({ uuid: uuid }, { $set: routesBus });
                return Promise.resolve(routesBus);
            } else {
                return Promise.resolve(null);
            }
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async delete(uuid: string): Promise<void> {
        try {
            this.collection.deleteOne({ uuid: uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }

    async list(): Promise<RoutesBus[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let origin = new Coordinate(element.origin.latitude, element.origin.longitude);
                    let destination = new Coordinate(element.destination.latitude, element.destination.longitude);
                    let routesBus = new RoutesBus(element.number, origin, destination, element.region, element.uuidBus);
                    routesBus.uuid = element.uuid;
                    return routesBus;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async findByUUID(uuid: string): Promise<RoutesBus | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let origin = new Coordinate(result.origin.latitude, result.origin.longitude);
                let destination = new Coordinate(result.destination.latitude, result.destination.longitude);
                let routesBus = new RoutesBus(result.number, origin, destination, result.region, result.uuidBus);
                routesBus.uuid = result.uuid;
                return routesBus;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("routesBus");
    }
}