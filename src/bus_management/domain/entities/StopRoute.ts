import { v4 as uuidv4 } from 'uuid';
import { Coordinate } from './Coordinate';

export class StopRoute{
    public uuid: string;
    public point: Coordinate;
    public uuidRoute: string;

    constructor(point: Coordinate, uuidRoute: string) {
        this.uuid = uuidv4();
        this.point = point;
        this.uuidRoute = uuidRoute;
    }   
}