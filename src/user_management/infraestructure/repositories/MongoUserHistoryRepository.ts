import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";
import { UserHistory } from "../../domain/entities/UserHistory";

export class MongoUserHistoryRepository implements UserHistoryInterface{
    private collection!: Collection|any;
    constructor() {
        this.initializeCollection();
    }
    async findAllByUserEmail(email: string): Promise<UserHistory[] | null> {
        try {
            const result = await this.collection.find({ 'user.email': email });
            if (result) {
                return result.toArray();
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    async findAllByUserUUID(user_uuid: string): Promise<UserHistory[] | null> {
        try {
            const result = await this.collection.find({ 'user_uuid': user_uuid });
            if (result) {
                return result.toArray();
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    async findByUUID(uuid: string): Promise<UserHistory | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            console.log(result);
            if (result) {
                return result;  
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    async deleteByUserUUID(user_uuid: string): Promise<void> {
        try {
            await this.collection.deleteMany({ user_uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }
    async deleteByUUID(uuid: string): Promise<void> {
        try	{
            await this.collection.deleteOne({ uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }
    async update(uuid: string, user_history: UserHistory): Promise<UserHistory | null> {
        console.log(uuid);
        console.log(user_history);
        try {
            let userUpdate = await this.findByUUID(uuid); 
            console.log(userUpdate);
            if (!userUpdate) {
                return Promise.resolve(null);
            }else{
                userUpdate = user_history;
                userUpdate.uuid = uuid;
                await this.collection.updateOne({ uuid }, { $set: userUpdate });
                return Promise.resolve(user_history);
            }
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    async create(user_history: UserHistory): Promise<UserHistory | null> {
        try	{
            this.collection.insertOne(user_history);
            return Promise.resolve(user_history);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("user_history");
    }

}