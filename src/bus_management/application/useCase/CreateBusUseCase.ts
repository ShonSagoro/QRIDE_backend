import { Bus } from "../../domain/entities/Bus";
import { BusInterface } from "../../domain/ports/BusInterface";
import { CreateBusRequest } from "../dtos/request/CreateBusRequest";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { BusResponse } from "../dtos/response/BusResponse";

export class CreateBusUseCase{
    constructor(readonly busInterface: BusInterface) {
        
    }
    async execute(request: CreateBusRequest): Promise<BaseResponse>{
        let bus = new Bus(request.driver, request.schedule, request.boardingPrice);
        let bus_result = await this.busInterface.create(bus);
        if(bus_result){
            let bus_response = new BusResponse(bus_result.uuid,bus_result.driver, bus_result.schedule, bus_result.boardingPrice);
            return new BaseResponse(bus_response, "Bus successfully created", true, 200);
        }else{
            return new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false, 500);
        }
    }

}