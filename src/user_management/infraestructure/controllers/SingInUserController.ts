import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { EncryptService } from '../../domain/services/EncriptServices';
import { BaseResponse } from '../../application/dtos/response/baseResponse';
import { SingInUserCase } from '../../application/use_case/SingInUserCase';
import { TokenServices } from '../../domain/services/TokenServices';
import { SingInUserRequest } from './../../application/dtos/request/SingInUserRequest';
import { Request, Response } from "express";

export class SingInUserController {
    GenerateToken = JWTMiddleware.GenerateToken;
    constructor(readonly singInUserCase: SingInUserCase, readonly encryptionService: EncryptService, readonly tokenServices: TokenServices) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        const singInUserRequest = new SingInUserRequest(data.email, data.password);
        try {
            let user = await this.singInUserCase.execute(singInUserRequest, this.encryptionService, this.tokenServices);
            if (user) {
                const uuid = user.uuid;
                const token = await this.GenerateToken({ uuid: uuid });
                const tokens = {
                    jwt_token: token,
                    user_token: user.status.token
                }
                const baseResponse = new BaseResponse(tokens, "You have successfully logged in", true);
                res.status(200).json(baseResponse);
                
            } else {
                const baseResponse = new BaseResponse(null, "User not found", false);
                res.status(401).send(baseResponse);
                return; 
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(500).json(baseResponse);
        }
    }
}