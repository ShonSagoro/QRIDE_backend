import { UpdateUserController } from './controllers/UpdateUserController';
import { SingOutUserController } from './controllers/SingOutUserController';
import { ActivateUserController } from './controllers/ActivateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';
import { TokenServices } from './services/TokenServices';
import { NodemailerEmailService } from './services/NodemailerEmailService';
import { ByEncryptServices } from './services/ByEncryptServices';
import { MysqlUserRepository } from './repositories/MysqlUserRepository';
import { SingUpUserCase } from '../application/use_case/SingUpUserCase';
import { GetByUserCase } from '../application/use_case/GetByUserCase';
import { UpdateUserUseCase } from '../application/use_case/UpdateUserCase';
import { DeleteUserCase } from '../application/use_case/DeleteUserCase';
import { ListUsersCase } from '../application/use_case/ListUsersCase';
import { ActivateUserCase } from '../application/use_case/ActivateUserCase';
import { SingInUserCase } from '../application/use_case/SingInUserCase';
import { SingOutUserCase } from '../application/use_case/SingOutUserCase';
import { SingInUserController } from './controllers/SingInUserController';
import { SingUpUserController } from './controllers/SingUpUserController';
import GetUserByUuidController from './controllers/GetUserByUuidController';
import GetUserByEmailController from './controllers/GetUserByEmailController';
import { ListUsersController } from './controllers/ListUsersController';


export const databaseRepository = new MysqlUserRepository();

export const encriptServices = new ByEncryptServices();
export const nodemailerEmailService = new NodemailerEmailService();
export const tokenServices = new TokenServices();

export const singUpUserCase = new SingUpUserCase(databaseRepository);
export const getUserUseCase = new GetByUserCase(databaseRepository);
export const updateUserUseCase = new UpdateUserUseCase(databaseRepository);
export const deleteUserUseCase = new DeleteUserCase(databaseRepository);
export const listUsersCase = new ListUsersCase(databaseRepository);
export const activateUserCase = new ActivateUserCase(databaseRepository);
export const singInUserCase = new SingInUserCase(databaseRepository);
export const singOutUserCase = new SingOutUserCase(databaseRepository);

export const singInUserController = new SingInUserController(singInUserCase, encriptServices, tokenServices);
export const singUpUserController = new SingUpUserController(singUpUserCase,nodemailerEmailService, encriptServices);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getByUuidController = new GetUserByUuidController(getUserUseCase);
export const getByEmailController = new GetUserByEmailController(getUserUseCase);
export const updateUserController = new UpdateUserController(updateUserUseCase, encriptServices);
export const listUsersController = new ListUsersController(listUsersCase);
export const activateUserController = new ActivateUserController(activateUserCase);
export const singOutUserController = new SingOutUserController(singOutUserCase);