import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_register = '/api/v1/users/sing_up'
let url_base_inicio_sesion = '/api/v1/users/sing_in'

describe("Mostrar rutas", () => {
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
        expect(response.status).toBe(200);
        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        jwt_token = response.body.data.jwt_token;
    });

    it('Deacuerdo a mi origin pueden haber o no rutas', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "0", longitude: "0" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(404);
        expect(response.body.data).toBe(null);

        response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "50", longitude: "-92" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);

    });

    it('Coordenadas vacias', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({})
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

    });

    it('Coordenadas incorrectas', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "a", longitude: "b" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

    });
    it('Coordenadas que superan el formato', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "50", longitude: "-92" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.length <= 10).toBe(true);

    });
    it('Limite de 10', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "900", longitude: "-900" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

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

describe("Buscar rutas", () => {
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
        expect(response.status).toBe(200);
        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        jwt_token = response.body.data.jwt_token;
    });

    it('Coordenadas vacias', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({})
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

    });

    it('Coordenadas incorrectas', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "a", longitude: "b" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

    });
    it('Coordenadas que superan el formato', async () => {
        let response = await request(app)
            .post("/api/v1/routes/aprox")
            .send({ latitude: "900", longitude: "-900" })
            .set('Authorization', `Bearer ${jwt_token}`);
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);

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
    });

    it('Agregar rutas', async () => {
        let response = await request(app)
        .post("/api/v1/routes/")
        .send({
            number: 19,
            origin:{
                latitude:"90",
                longitude:"-90"
            },
            destination:{
                latitude:"4",
                longitude:"90"
            },
            region:"Chiapas",
            uuidBus:"4857af8d-483e-4cd5-9ac4-ed4d547f987d"
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