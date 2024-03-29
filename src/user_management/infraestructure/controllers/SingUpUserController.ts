import { UserResponse } from './../../application/dtos/response/UserResponse';
import { EmailService } from '../../domain/services/EmailServices';
import { SingUpUserRequest } from './../../application/dtos/request/SingUpUserRequest';
import { Request, Response } from "express";
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { SingUpUserCase } from '../../application/use_case/SingUpUserCase';
import { EncryptService } from '../../domain/services/EncriptServices';

export class SingUpUserController {

    constructor(readonly singUpUserCase: SingUpUserCase, readonly emailService: EmailService, readonly encryptionService: EncryptService) {
    }

    async execute(req: Request, res: Response) {
        const data = req.body;
        data.password = await this.encryptionService.execute(data.password);
        const singUpUserRequest = new SingUpUserRequest(data.email, data.password, data.name, data.lastName, data.phoneNumber);
        try {
            console.log(singUpUserRequest);
            const user = await this.singUpUserCase.execute(singUpUserRequest);
            console.log(user);
            if (user) {
                console.log("Entre");
                const verificationUrl = `http://${process.env.URL_SERVER}:${process.env.PORT_SERVER}/users/activate/${user.uuid}`;
                await this.emailService.sendEmail(user.credentials.email, "VERITY", `por favor verifiquse aqui: ${verificationUrl}`);
                console.log(user);
                const userResponse = new UserResponse(user);
                console.log(userResponse);
                const baseResponse = new BaseResponse(userResponse, "User successfully created", true);
                res.status(200).send(baseResponse);
            } else {
                const baseResponse = new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false);
                res.status(500).send(baseResponse);
            }
        } catch (error) {
            console.log("adios");
            console.log(error);
            const baseResponse = new BaseResponse(null, "Ha ocurrido un error con tu peticion, inténtelo más tarde.", false);
            res.status(204).send(baseResponse);
        }
    }
}