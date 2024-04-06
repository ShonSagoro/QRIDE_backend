import request from 'supertest';
import { app, server } from '../app';



let url_base_inicio_sesion = '/api/v1/users/sing_in'
let url_base_register_user = '/api/v1/users/sing_up'

describe("Generar valoración", () => {
    let userUUID: string;
    let jwtToken: string;

    beforeAll(async () => {
        let response = await request(app)
            .post(url_base_register_user)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test_valoration@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;

        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                email: 'test_valoration@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        jwtToken = response.body.data.jwt_token;
    });

    it('Tipico: puede haber o no comentario', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            raiting: 4.1,
            comment: "",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(200);

        data = {
            raiting: 3,
            comment: "Hola",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(200);

    });

    it('Rating is required', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            comment: "Hello",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(400);
    });

    it('Rating should not be negative', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            raiting: -1,
            comment: "Hello",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(400);
    });

    it('Rating should not be more than 5', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            raiting: 6,
            comment: "Hello",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(400);
    });

    it('Comment should not exceed 300 characters', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            raiting: 4.1,
            comment: "A".repeat(301),
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(400);
    });

    it('Comment can contain special characters', async () => {
        let valoration_create = '/api/v1/valorations/'
        let data = {
            raiting: 4.1,
            comment: "Hello!@#$%^&*()",
            uuidUser: "ee249810-e486-4c3d-bd52-7bbe3cb01c17",
            uuidBus: "01d0046b-bbd3-4669-8de6-a2852dcccfb4"
        };
        let response = await request(app)
            .post(valoration_create)
            .send(data)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        let response = await request(app)
            .delete(`/api/v1/users/${userUUID}`)
            .set('Authorization', `Bearer ${jwtToken}`);
        expect(response.status).toBe(200);
    });
});

afterAll(() => {
    server.close();
});