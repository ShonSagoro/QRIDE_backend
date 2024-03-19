import request from 'supertest';
import { app } from '../../app';

let url_base = '/api/v1/users/sing_in'
describe('Iniciar sesión', () => {
    it('no debería permitir un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: '', password: 'password' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: 'test@example.com', password: '' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: 'invalid', password: 'password' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: 'nonexistent@example.com', password: 'password' });
        expect(response.status).toBe(404);
    });

    it('no debería permitir una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: 'test@example.com', password: 'incorrect' });
        expect(response.status).toBe(404);
    });

    it('debería devolver un token si el acceso es correcto', async () => {
        const response = await request(app)
            .post(url_base)
            .send({ email: 'test@example.com', password: 'password' });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('user_token');
    });
});
