import { GetByAproximationRoutesUseCase } from './../application/useCase/GetByAproximationRoutesUseCase';
import { UpdateBusController } from './controllers/UpdateBusController';
import { CreateBusController } from './controllers/CreateBusController';
import { ListValorationUseCase } from './../application/useCase/ListValorationUseCase';
import { GetByUUIDUserValorationUseCase } from './../application/useCase/GetByUUIDUserValorationUseCase';
import { GetByUUIDValorationUseCase } from './../application/useCase/GetByUUIDValorationUseCase';
import { DeleteValorationUseCase } from './../application/useCase/DeleteValorationUseCase';
import { CreateValorationUseCase } from './../application/useCase/CreateValorationUseCase';
import { UpdateRoutesBusUseCase } from './../application/useCase/UpdateRoutesBusUseCase';
import { ListRoutesBusUseCase } from './../application/useCase/ListRoutesBusUseCase';
import { GetByUUIDRoutesBusUseCase } from './../application/useCase/GetByUUIDRoutesBusUseCase';
import { GetByUUIDBusValorationUseCase } from './../application/useCase/GetByUUIDBusValorationUseCase';
import { DeleteBusUseCase } from './../application/useCase/DeleteBusUseCase';
import { ListBusUseCase } from '../application/useCase/ListBusUseCase';
import { UpdateBusUseCase } from '../application/useCase/UpdateBusUseCase';
import { CreateBusUseCase } from './../application/useCase/CreateBusUseCase';
import { MongoBusRepository } from "./repositories/MongoBusRepository";
import { MongoRoutesBusRepository } from "./repositories/MongoRoutesBusRepository";
import { MongoValorationsRespository } from "./repositories/MongoValorationsRespository";
import { GetByUUIDBusUseCase } from '../application/useCase/GetByUUIDBusUseCase';
import { CreateRoutesBusUseCase } from '../application/useCase/CreateRoutesBusUseCase';
import { DeleteRoutesBusUseCase } from '../application/useCase/DeleteRoutesBusUseCase';
import { UpdateValorationUseCase } from '../application/useCase/UpdateValorationUseCase';
import { DeleteBusController } from './controllers/DeleteBusController';
import { GetByUUIDBusController } from './controllers/GetByUUIDBusController';
import { ListBusController } from './controllers/ListBusController';
import { CreateRoutesBusController } from './controllers/CreateRoutesBusController';
import { DeleteRoutesBusController } from './controllers/DeleteRoutesBusController';
import { GetByUUIDRoutesBusController } from './controllers/GetByUUIDRoutesBusController';
import { ListRoutesBusController } from './controllers/ListRoutesBusController';
import { UpdateRoutesBusController } from './controllers/UpdateRoutesBusController';
import { CreateValorationController } from './controllers/CreateValorationController';
import { DeleteValorationController } from './controllers/DeleteValorationController';
import { GetByUUIDBusValorationController } from './controllers/GetByUUIDBusValorationController';
import { GetByUUIDUserValorationController } from './controllers/GetByUUIDUserValorationController';
import { ListValorationController } from './controllers/ListValorationController';
import { GetByUUIDValorationController } from './controllers/GetByUUIDValorationController';
import { UpdateValorationController } from './controllers/UpdateValorationController';
import { MongoStopRouteRepository } from './repositories/MongoStopRoutesjRepository';
import { CreateStopBusUseCase } from '../application/useCase/CreateStopBusUseCase';
import { DeleteStopBusUseCase } from '../application/useCase/DeleteStopBusUseCase';
import { GetByAproximationStopBusUseCase } from '../application/useCase/GetByAproximationStopBusUseCase';
import { GetByRouteUUIDStopBusUseCase } from '../application/useCase/GetByRouteUUIDStopBusUseCase';
import { GetByUUIDStopBusUseCase } from '../application/useCase/GetByUUIDStopBusUseCase';
import { UpdateStopBusUseCase } from '../application/useCase/UpdateStopBusUseCase';
import { CreateStopBusController } from './controllers/CreateStopBusController';
import { DeleteStopBusController } from './controllers/DeleteStopBusController';
import { GetByAproximationStopBusController } from './controllers/GetByAproximationStopBusController';
import { GetByRouteUUIDStopBusController } from './controllers/GetByRouteUUIDStopBusController';
import { GetByUUIDStopBusController } from './controllers/GetByUUIDStopBusController';
import { UpdateStopBusController } from './controllers/UpdateStopBusController';
import { GetByAproximationRoutesController } from './controllers/GetByAproximationRoutesController';


// Bus
export const databaseBusRepository = new MongoBusRepository();

export const createBusUseCase = new CreateBusUseCase(databaseBusRepository);
export const deleteBusUseCase = new DeleteBusUseCase(databaseBusRepository);
export const getByUUIDBusUseCase = new GetByUUIDBusUseCase(databaseBusRepository); 
export const listBusUseCase = new ListBusUseCase(databaseBusRepository);
export const updateBusUseCase = new UpdateBusUseCase(databaseBusRepository);

export const createBusController = new CreateBusController(createBusUseCase);
export const deleteBusController = new DeleteBusController(deleteBusUseCase);
export const getByUUIDBusController = new GetByUUIDBusController(getByUUIDBusUseCase);
export const listBusController = new ListBusController(listBusUseCase);
export const updateBusController = new UpdateBusController(updateBusUseCase);

// Routes
export const databaseRoutesBusRepository = new MongoRoutesBusRepository();

export const createRoutesBusUseCase = new CreateRoutesBusUseCase(databaseRoutesBusRepository);
export const deleteRoutesBusUseCase = new DeleteRoutesBusUseCase(databaseRoutesBusRepository);
export const getByUUIDRoutesBusUseCase = new GetByUUIDRoutesBusUseCase(databaseRoutesBusRepository);
export const listRoutesBusUseCase = new ListRoutesBusUseCase(databaseRoutesBusRepository);
export const updateRoutesBusUseCase = new UpdateRoutesBusUseCase(databaseRoutesBusRepository);
export const getByAproximationRoutesUseCase = new GetByAproximationRoutesUseCase(databaseRoutesBusRepository);

export const createRoutesBusController = new CreateRoutesBusController(createRoutesBusUseCase);
export const deleteRoutesBusController = new DeleteRoutesBusController(deleteRoutesBusUseCase);
export const getByUUIDRoutesBusController = new GetByUUIDRoutesBusController(getByUUIDRoutesBusUseCase);
export const listRoutesBusController = new ListRoutesBusController(listRoutesBusUseCase);
export const updateRoutesBusController = new UpdateRoutesBusController(updateRoutesBusUseCase);
export const getByAproximationRoutesController = new GetByAproximationRoutesController(getByAproximationRoutesUseCase);
// Valoration
export const databaseValorationRepository = new MongoValorationsRespository();

export const createValorationUseCase = new CreateValorationUseCase(databaseValorationRepository);
export const deleteValorationUseCase = new DeleteValorationUseCase(databaseValorationRepository);
export const getByUUIDBusValorationUseCase = new GetByUUIDBusValorationUseCase(databaseValorationRepository);
export const getByUUIDUserValorationUseCase = new GetByUUIDUserValorationUseCase(databaseValorationRepository);
export const getByUUIDValorationUseCase = new GetByUUIDValorationUseCase(databaseValorationRepository);
export const listValorationUseCase = new ListValorationUseCase(databaseValorationRepository);
export const updateValorationUseCase = new UpdateValorationUseCase(databaseValorationRepository);

export const createValorationController = new CreateValorationController(createValorationUseCase);
export const deleteValorationController = new DeleteValorationController(deleteValorationUseCase);
export const getByUUIDBusValorationController = new GetByUUIDBusValorationController(getByUUIDBusValorationUseCase);
export const getByUUIDUserValorationController = new GetByUUIDUserValorationController(getByUUIDUserValorationUseCase);
export const getByUUIDValorationController = new GetByUUIDValorationController(getByUUIDValorationUseCase);
export const listValorationController = new ListValorationController(listValorationUseCase);
export const updateValorationController = new UpdateValorationController(updateValorationUseCase);

// Stops 
export const databaseStopRouteRepository = new MongoStopRouteRepository();

export const createStopRouteUseCase = new CreateStopBusUseCase(databaseStopRouteRepository);
export const deleteStopBusUseCase = new DeleteStopBusUseCase(databaseStopRouteRepository);
export const getByAproximationStopBusUseCase = new GetByAproximationStopBusUseCase(databaseStopRouteRepository);
export const getByRouteUUIDStopBusUseCase = new GetByRouteUUIDStopBusUseCase(databaseStopRouteRepository);
export const getByUUIDStopBusUseCase = new GetByUUIDStopBusUseCase(databaseStopRouteRepository);
export const updateStopBusUseCase = new UpdateStopBusUseCase(databaseStopRouteRepository);

export const createStopBusController = new CreateStopBusController(createStopRouteUseCase);
export const deleteStopBusController = new DeleteStopBusController(deleteStopBusUseCase);
export const getByAproximationStopBusController = new GetByAproximationStopBusController(getByAproximationStopBusUseCase);
export const getByRouteUUIDStopBusController = new GetByRouteUUIDStopBusController(getByRouteUUIDStopBusUseCase);
export const getByUUIDStopBusController = new GetByUUIDStopBusController(getByUUIDStopBusUseCase);
export const updateStopBusController = new UpdateStopBusController(updateStopBusUseCase);
