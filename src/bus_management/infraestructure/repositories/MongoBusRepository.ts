import { BusInterface } from "../../domain/ports/BusInterface";
import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import { Bus } from "../../domain/entities/Bus";

export class MongoBusRepository implements BusInterface{
    private collection!: Collection|any;

    constructor() {
        this.initializeCollection();
    }

    async create(bus: Bus): Promise<Bus | null> {
        try{
            this.collection.insertOne(bus);
            return Promise.resolve(bus);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async update(uuid: string, bus: Bus): Promise<Bus | null> {
        try{
            let bus_exist = await this.findByUUID(uuid);
            if(bus_exist){
                this.collection.updateOne({uuid: uuid}, {$set: bus});
                return Promise.resolve(bus);
            }else{
                return Promise.resolve(null);
            } 
        }catch(error){

        }
        throw new Error("Method not implemented.");
    }
    async delete(uuid: string): Promise<void> {
        try{
            this.collection.deleteOne({uuid: uuid});
            return Promise.resolve();
        }catch(error){
            return Promise.resolve();
        }
    }
    async list(): Promise<Bus[] | null> {
        try{
            const result = await this.collection.find().toArray();
            if(result){
                let buses: Bus[] = result.map((element: any) => {
                    let bus = new Bus(element.driver, element.schedule, parseInt(element.boardingPrice));
                    bus.uuid = element.uuid;
                    return bus;
                });
                console.log(buses);
                return result.map((element: any) => {
                    let bus = new Bus(element.driver, element.schedule, parseInt(element.boardingPrice));
                    bus.uuid = element.uuid;
                    return bus;
                });
            }
            
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async findByUUID(uuid: string): Promise<Bus | null> {
        try{
            const result = await this.collection.findOne({uuid});
            if(result){
                return result;
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("buses");
    }

}