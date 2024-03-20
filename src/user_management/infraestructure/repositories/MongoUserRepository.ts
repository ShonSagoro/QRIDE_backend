import { Collection } from "mongodb";
import { connect } from "../../../database/mongodb";
import { UserInterface } from "../../domain/ports/UserInterface";
import { User } from "../../domain/entities/User";
import { Status } from "../../domain/entities/Status";
import { Contact } from "../../domain/entities/Contact";
import { Credentials } from "../../domain/entities/Credentials";
import { EncryptService } from "../../domain/services/EncriptServices";
import { TokenServices } from "../services/TokenServices";

export class MongoDBUserRepository implements UserInterface {
    private collection!: Collection|any;
    constructor() {
        this.initializeCollection();
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("user");
    }

    async findByUUID(uuid: string): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, "");
              
                let user = new User(status, contact, credentials);
                user.uuid = result.uuid;
                return user;
            }       
            return null;
        } catch (error) {
            return null;
        }
    }

    async sing_out(uuid: string): Promise<void> {
        console.log("DESLOGEAO")
        try{
            const result = await this.collection.findOne({ uuid });
            if (result) {
                await this.collection.updateOne({ uuid }, { $set: { token: "" } });
            }else{

            }
        }catch(error){
            console.error(error)
        }   
        return Promise.resolve();
    }

    async sing_in(email: string, password: string, encryptionService: EncryptService, tokenServices: TokenServices): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ 'credentials.email': email });
            console.log(result);
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, result.credentials.password);
                const user = new User(status, contact, credentials);
                user.uuid=result.uuid;
                if (await encryptionService.compare(password, user.credentials.password)) {
                    user.status.token = await tokenServices.generateToken(); 
                    user.status.verifiedAt = new Date();
                    await this.collection.updateOne({ uuid: user.uuid }, { $set: user });
                    return user;
                }else{
                    return null;
                }
            }
            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async updateUserVerifiedAt(uuid: string): Promise<void> {
        try {
            const result = await this.collection.findOne({ uuid });
            if (result) {
                await this.collection.updateOne({ uuid }, { $set: { 'status.verifiedAt': new Date() } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const result = await this.collection.findOne({ 'credentials.email': email });
            console.log(result);
            console.log(email);
            console.log("ENCONTRADO");
            if (result) {
                let status = new Status(result.token, result.verifiedAt);
                let contact = new Contact(result.contact.name, result.contact.lastName, result.contact.phoneNumber);
                let credentials = new Credentials(result.credentials.email, "");
              
                let user = new User(status, contact, credentials);
                user.uuid = result.uuid;
                return user;
            }       
            return null;
        } catch (error) {
            return null;
        }
    }

    async sing_up(user: User): Promise<User | null> {
        let user_origin=user;
        try {
            const result = await this.collection.findOne({ 'credentials.email': user.credentials.email });
            if (result) {
                return null;
            }else{
                const { _id, ...userWithoutId } = user as any;
                await this.collection.insertOne(userWithoutId);
                return user_origin;
            }
        } catch (error) {
            console.error(error); 
            return null;
        }
    }

    async delete(uuid:string): Promise<void> {
        try {
            await this.collection.deleteOne({ uuid });
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    async update(uuid:string, user: User): Promise<User | null> {
        console.log("actualizo");
        try {
            console.log(user);
            if (user.credentials.email){
                console.log(user.credentials.email);
                let user_exist = await this.findByEmail(user.credentials.email);
                if (user_exist){
                    console.log("EXISTE");
                    return null;
                }
            }

            user.uuid = uuid;
            let user_data = await this.findByUUID(uuid);
            
            const updatedUser = {
                'contact.name': user.contact.name !== undefined ? user.contact.name : (user_data?.contact?.name || ''),
                'contact.lastname': user.contact.lastname !== undefined ? user.contact.lastname : (user_data?.contact?.lastname || ''),
                'contact.number_phone': user.contact.phoneNumber !== undefined ? user.contact.phoneNumber : (user_data?.contact?.phoneNumber || ''),
                'credentials.email': user.credentials.email !== undefined ? user.credentials.email : (user_data?.credentials?.email || ''),
                'credentials.password': user.credentials.password !== undefined ? user.credentials.password : (user_data?.credentials?.password || ''),
            };

            await this.collection.updateOne({ uuid: uuid }, { $set: updatedUser });
            console.log("ACTUALIZADO");
            return user;
        } catch (error) {
            return null;
        }
    }

    async list(): Promise<User[] | null> {
        try {
            const result = await this.collection.find().toArray();

            return result.map((user: { token: string; verifiedAt: Date; contact: { name: string; lastName: string; phoneNumber: string; }; credentials: { email: string; password: string; }; uuid: string; }) => {
                let status = new Status(user.token, user.verifiedAt);
                let contact = new Contact(user.contact.name, user.contact.lastName, user.contact.phoneNumber);
                let credentials = new Credentials(user.credentials.email, "");
                
                let newUser = new User(status, contact, credentials);
                newUser.uuid = user.uuid;
                
                return newUser;
            });
        } catch (error) {
            return null;
        }
    }
}