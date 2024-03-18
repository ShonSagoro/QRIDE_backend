import { Request, Response } from "express";
import { UpdateUserRequest } from "../../application/dtos/request/UpdateUserRequest";
import { UserResponse } from "../../application/dtos/response/UserResponse";
import { BaseResponse } from "../../application/dtos/response/baseResponse";
import { UpdateUserUseCase } from "../../application/use_case/UpdateUserCase";
import { EncryptService } from "../../domain/services/EncriptServices";

export class UpdateUserController {
    constructor(readonly updateUserCase: UpdateUserUseCase, readonly encryptionService: EncryptService) { }

    async execute(req: Request, res: Response) {
        const data = req.body;
        data.password = await this.encryptionService.execute(data.password);
        const { uuid } = req.params;
        const userUpdateRequest = new UpdateUserRequest(data.email, data.password, data.name, data.lastname, data.phoneNumber);
        try {
            const user = await this.updateUserCase.execute(
                uuid, userUpdateRequest
            );
            if (user) {
                const userResponse = new UserResponse(user);
                const baseResponse = new BaseResponse(userResponse, "User successfully updated", true);
                res.status(200).send(baseResponse);
            } else {
                const baseResponse = new BaseResponse(null, "User not found", false);
                res.status(500).send(baseResponse);
            }
        } catch (error) {
            const baseResponse = new BaseResponse(null, "Internal server error", false);
            res.status(204).send(baseResponse);
        }
    }
}