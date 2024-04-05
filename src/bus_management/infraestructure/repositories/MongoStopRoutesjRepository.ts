import { Coordinate } from "../../domain/entities/Coordinate";
import { StopRoute } from "../../domain/entities/StopRoute";
import { StopRouteInterface } from "../../domain/ports/StopRouteInterface";
import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";

export class MongoStopRouteRepository implements StopRouteInterface{
    private collection!: Collection|any;

    constructor() {
        this.initializeCollection();
    }

    async create(stops: StopRoute[]): Promise<StopRoute[] | null> {
        try{
            stops.forEach(async stop => {
                await this.collection.insertOne(stop);
            });
            return Promise.resolve(stops);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async delete(uuid: string): Promise<void> {
        try{
            this.collection.deleteOne({uuid: uuid});
            return Promise.resolve();
        }catch(error){
            return Promise.resolve();
        }
    }
    async findByAproximation(coordinate: Coordinate): Promise<StopRoute[] | null> {
        try{
            const result = await this.collection.find({
                "point.latitude": coordinate.latitude,
                "point.longitude": coordinate.longitude
            }).toArray();
            if(result){
                return result.map((element: any) => {
                    let point = new Coordinate(element.point.latitude, element.point.longitude);
                    let stopRoute = new StopRoute(point, element.uuidRoute);
                    stopRoute.uuid = element.uuid;
                    return stopRoute;
                });
            }
            return Promise.resolve(null);
        }catch(error){
            console.log(error);
            return Promise.resolve(null);
        }
    }
    async findByRouteUUID(uuidRoute: string): Promise<StopRoute[] | null> {
        try{
            const result = await this.collection.find({uuidRoute: uuidRoute}).toArray();
            if(result){
                return result.map((element: any) => {
                    let point = new Coordinate(element.point.latitude, element.point.longitude);
                    let stopRoute = new StopRoute(point, element.uuidRoute);
                    stopRoute.uuid = element.uuid;
                    return stopRoute;
                });
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async findByUUID(uuid: string): Promise<StopRoute | null> {
        try{
            const result = await this.collection.findOne({uuid});
            if(result){
                let point = new Coordinate(result.point.latitude, result.point.longitude);
                let stopRoute = new StopRoute(point, result.uuidRoute);
                stopRoute.uuid = result.uuid;
                return stopRoute;
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async update(uuid: string, bus: StopRoute): Promise<StopRoute | null> {
        try{
            let bus_exist = await this.findByUUID(uuid);
            if(bus_exist){
                this.collection.updateOne({uuid: uuid}, {$set: bus});
                return Promise.resolve(bus);
            }else{
                return Promise.resolve(null);
            }
        }catch(error){
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("stopsRoutes");
    }

}