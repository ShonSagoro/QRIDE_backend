import { Valoration } from "../../domain/entities/Valoration";
import { ValorationInterface } from "../../domain/ports/ValorationInterface";
import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";

export class MongoValorationsRespository implements ValorationInterface{
    private collection!: Collection|any;

    constructor() {
        this.initializeCollection();
    }
    async create(valoration: Valoration): Promise<Valoration | null> {
        try{
            await this.collection.insertOne(valoration);
            return Promise.resolve(valoration);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async update(uuid: string, valoration: Valoration): Promise<Valoration | null> {
        try{
            let valoration_exist = await this.findByUUID(uuid);
            if(valoration_exist){
                valoration.uuidBus = valoration_exist.uuidBus;
                valoration.uuidUser = valoration_exist.uuidUser;
                this.collection.updateOne({uuid: uuid}, {$set: valoration});
                return Promise.resolve(valoration);
            }else{
                return Promise.resolve(null);
            }
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

    async list(): Promise<Valoration[] | null> {
        try{
            const result = await this.collection.find().toArray();
            if(result){
                return  result.map((element: any) => {
                    let valoration = new Valoration(parseInt(element.raiting), element.comment ,element.uuidUser, element.uuidBus);
                    valoration.uuid = element.uuid;
                    return valoration;
                });
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }
    async findByUUID(uuid: string): Promise<Valoration | null> {
        try{
            const result = await this.collection.findOne({uuid});
            if(result){
                console.log(result);
                return new Valoration(parseInt(result.raiting), result.comment, result.uuidUser, result.uuidBus);
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }

    async findByUserUUID(user_uuid: string): Promise<Valoration[] | null> {
        try{
            const result = await this.collection.find({"uuidUser": user_uuid}).toArray();
            if(result){
                return result.map((element: any) => {
                    let valoration = new Valoration(parseInt(element.raiting), element.comment ,element.uuidUser, element.uuidBus);
                    valoration.uuid = element.uuid;
                    return valoration;
                });
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }

    async findByBusUUID(bus_uuid: string): Promise<Valoration[] | null> {
        try{
            const result = await this.collection.find({"uuidBus": bus_uuid}).toArray();
            console.log(result);
            if(result){
                return result.map((element: any) => {
                    let valoration = new Valoration(parseInt(element.raiting), element.comment ,element.uuidUser, element.uuidBus);
                    valoration.uuid = element.uuid;
                    return valoration;
                });
            }
            return Promise.resolve(null);
        }catch(error){
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("valorations");
    }

}