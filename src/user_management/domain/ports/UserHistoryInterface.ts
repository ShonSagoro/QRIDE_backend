import { UserHistory } from '../entities/UserHistory';

export interface UserHistoryInterface {
    findAllByUserEmail(email: string): Promise<UserHistory[] | null>;
    findAllByUserUUID(user_uuid: string): Promise<UserHistory[] | null>;
    findByUUID(uuid: string): Promise<UserHistory | null>;
    deleteByUserUUID(user_uuid: string): Promise<void>;
    deleteByUUID(uuid: string): Promise<void>;
    update(uuid:string, user_history:UserHistory): Promise<UserHistory | null>;
    create(user_history:UserHistory ): Promise<UserHistory | null>;
}
