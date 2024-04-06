import request from 'supertest';
import { app, server } from '../app';

let url_base_inicio_sesion = '/api/v1/users/sing_in'
let url_base_register = '/api/v1/users/sing_up'

describe("Mostrar Historial", () => {
    let userUUID: string;
    beforeAll(async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test@gmail.com',
                password: '12345678'
            });
        console.log(response.body.data.message);
        expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;
    });
    it('Obtener Historial', async () => {
        console.log(true);
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
