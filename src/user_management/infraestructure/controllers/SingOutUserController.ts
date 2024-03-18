import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import { BaseResponse } from "../../application/dtos/response/BaseResponse";
import JWTMiddleware from '../../../middleware/JWTMiddleware';
import { SingOutUserCase } from '../../application/use_case/SingOutUserCase';

export class SingOutUserController {
    jwtMiddleware = new JWTMiddleware();
    constructor(readonly singOutUserCase: SingOutUserCase ) { }

    async execute(req: Request, res: Response) {
        const { uuid } = req.params;
        const headers = req.headers as IncomingHttpHeaders;
        const authHeader = headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const token = authHeader.split(' ')[1];
        console.log(token); 
        try {
            this.jwtMiddleware.addToBlacklist(token);
            this.singOutUserCase.execute(uuid);
            const baseResponse = new BaseResponse("Success", "User successfully SINGOUT", true);
            res.status(200).send(baseResponse);
        } catch (error) {
            const baseResponse = new BaseResponse("Error", "Ha ocurrido un error durante su petición.", false);
            res.status(500).json(baseResponse);
        }
    }
}