
import request from 'supertest';
import { app, server } from '../app';

let url_base_register = '/api/v1/users/sing_up'
let url_base_inicio_sesion = '/api/v1/users/sing_in'
describe("Agregar rutas", () => {
    let userUUID: string;
    let jwt_token: string;

    beforeAll(async () => {
        let response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test@gmail.com',
                password: '12345678'
            });
        userUUID = response.body.data.uuid;
        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        jwt_token = response.body.data.jwt_token;
    });

    it('Agregar Bus', async () => {
        let response = await request(app)
            .post("/api/v1/bus/")
            .send({
                driver: "Juan",
                schedule: "10:00 am to 8:00 pm",
                boardingPrice: 40.0
            })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });


    afterAll(async () => {
        let response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        const token = response.body.data.jwt_token;
        response = await request(app)
            .delete(`/api/v1/users/${userUUID}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});

afterAll(async () => {
    server.close();
});