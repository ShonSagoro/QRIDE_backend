import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import { UserHistoryInterface } from "../../domain/ports/UserHistoryInterface";
import { UserHistory } from "../../domain/entities/UserHistory";

export class MongoUserHistoryRepository implements UserHistoryInterface{
    private collection!: Collection|any;
    constructor() {
        this.initializeCollection();
    }
    findAllByUserEmail(email: string): Promise<UserHistory[] | null> {
        try {
            const result = this.collection.find({ 'user.email': email });
            if (result) {
                return result.toArray();
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    findAllByUserUUID(user_uuid: string): Promise<UserHistory[] | null> {
        try {
            const result = this.collection.find({ 'user_uuid': user_uuid });
            if (result) {
                return result.toArray();
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    findByUUID(uuid: string): Promise<UserHistory | null> {
        try {
            const result = this.collection.findOne({ uuid });
            if (result) {
                return result;
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    deleteByUserUUID(user_uuid: string): Promise<void> {
        try {
            this.collection.deleteMany({ user_uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }
    deleteByUUID(uuid: string): Promise<void> {
        try	{
            this.collection.deleteOne({ uuid });
            return Promise.resolve();
        } catch (error) {
            return Promise.resolve();
        }
    }
    update(uuid: string, user_history: UserHistory): Promise<UserHistory | null> {
        try {
            this.collection.updateOne({ uuid }, { $set: user_history });
            return Promise.resolve(user_history);
        } catch (error) {
            return Promise.resolve(null);
        }
    }
    create(user_history: UserHistory): Promise<UserHistory | null> {
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