import request from 'supertest';
import { app } from '../../app';

let url_base_inicio_sesion = '/api/v1/users/sing_in'
describe('Iniciar sesión', () => {
    it('no debería permitir un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: '', password: 'password' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@example.com', password: '' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'invalid', password: 'password' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'nonexistent@example.com', password: 'password' });
        expect(response.status).toBe(404);
    });

    it('no debería permitir una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@example.com', password: 'incorrect' });
        expect(response.status).toBe(404);
    });

    it('debería devolver un token si el acceso es correcto', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('user_token');
    });
});

let url_base_cierre_sesion = '/api/v1/users/sing_out/4b9550b9-e045-43e2-8a8b-e8e11a00392c'
let url_protegida = '/api/v1/users'
describe('Cerrar sesión', () => {
    it('debe banear el token de autenticación y restringir el acceso a las rutas protegidas', async () => {
        const sing_in = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@example.com', password: 'password' });
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNGI5NTUwYjktZTA0NS00M2UyLThhOGItZThlMTFhMDAzOTJjIiwiaWF0IjoxNzEwODMyMjI5LCJleHAiOjE3MTA4Mzk0Mjl9.HwyglvCN3ZWBKN9JC4AXDnpQmw6vSKbMmrimholfdd0";
        if (sing_in.body && sing_in.body.data && sing_in.body.data.jwt_token) {
            let token = sing_in.body.data.jwt_token;
        } else {
            console.error('JWT token not found in the response');
        }

        const response = await request(app)
            .get(url_base_cierre_sesion)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sesión cerrada correctamente');

        const responseProtected = await request(app)
            .get(url_protegida)
            .set('Authorization', `Bearer ${token}`);

        expect(responseProtected.status).toBe(401);
        expect(responseProtected.body.message).toBe('Token is revoked');});

    it('no debe ser posible cerrar sesión dos veces seguidas', async () => {
        const sing_in = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@example.com', password: 'password' });
        let token = sing_in.body.data.jwt_token;

        const responseFirst = await request(app)
            .get(url_base_cierre_sesion)
            .set('Authorization', `Bearer ${token}`);

        expect(responseFirst.status).toBe(200);
        expect(responseFirst.body.message).toBe('Sesión cerrada correctamente');

        const responseSecond = await request(app)
            .get(url_base_cierre_sesion)
            .set('Authorization', `Bearer ${token}`);

        expect(responseSecond.status).toBe(401);
        expect(responseSecond.body.message).toBe('Token is revoked');
    });
});