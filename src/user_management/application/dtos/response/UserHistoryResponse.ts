import { Coordinate } from '../../../domain/entities/Coordinate';
import { UserHistory } from './../../../domain/entities/UserHistory';
export class UserHistoryResponse {
    uuid: string;
    origin: Coordinate;
    destiny: Coordinate;
    user_uuid: string;
    constructor(userHistory: UserHistory) {
        this.uuid = userHistory.uuid;
        this.origin = new Coordinate(userHistory.origin.latitude, userHistory.origin.longitude);
        this.destiny = new Coordinate(userHistory.destiny.latitude, userHistory.destiny.longitude);
        this.user_uuid = userHistory.user_uuid;
    }
}