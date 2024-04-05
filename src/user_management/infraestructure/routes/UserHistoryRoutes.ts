import { Express } from "express";
import JWTMiddleware from "../../../middleware/JWTMiddleware";
import dotenv from 'dotenv';
import { createUserHistoryController, deleteUserHistoryByUserUUIDController, deleteUserHistoryController, getUserHistoryByUUIDController, listUserHistoryByUUIDUserController, updateUserHistoryController } from "../Dependencies";
dotenv.config();

const Verifytoken = JWTMiddleware.VerifyToken
const MODEL_URL = "history/";
const BASE_URL = process.env.BASE_URL || "/api/v1/";

export function setupUserHistoryRoutes(app: Express) {
    app.get(`${BASE_URL}${MODEL_URL}health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`${BASE_URL}${MODEL_URL}`, Verifytoken, createUserHistoryController.execute.bind(createUserHistoryController));
    app.delete(`${BASE_URL}${MODEL_URL}user/:uuid`, Verifytoken, deleteUserHistoryByUserUUIDController.execute.bind(deleteUserHistoryByUserUUIDController));
    app.delete(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, deleteUserHistoryController.execute.bind(deleteUserHistoryController));
    app.get(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, getUserHistoryByUUIDController.execute.bind(getUserHistoryByUUIDController));
    app.get(`${BASE_URL}${MODEL_URL}user/:uuid`, Verifytoken, listUserHistoryByUUIDUserController.execute.bind(listUserHistoryByUUIDUserController));
    app.put(`${BASE_URL}${MODEL_URL}:uuid`, Verifytoken, updateUserHistoryController.execute.bind(updateUserHistoryController));
}