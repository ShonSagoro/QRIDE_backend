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

let uuid_sing_out = "4b9550b9-e045-43e2-8a8b-e8e11a00392c"
let url_base_cierre_sesion = `/api/v1/users/sing_out/${uuid_sing_out}`
describe('Cerrar sesión', () => {

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


let uuid_new_user = "6d092547-27a5-4b19-a7e7-c148674a0bac";
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOGU3ZDA0OTYtMTBhNC00MzAzLWIxMjgtZGQxZTk2ZGNiY2QyIiwiaWF0IjoxNzEwOTE0MjI2LCJleHAiOjE3MTA5MjE0MjZ9.fQKlYtkLbpyFH4iVzmujbwvdB1m7MrFazNsZA9grlDk";
let url_base_registro = '/api/v1/users/sing_up';
describe('Actualizar perfil', () => {
    it('debería actualizar el perfil del usuario correctamente con datos válidos', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;

        let response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'password2',
                name: 'test3',
                lastName: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${token}`);
        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User successfully updated');
        expect(response.body.data).toHaveProperty('uuid');
        expect(response.body.data).toHaveProperty('email', 'test1234@example.com');
        expect(response.body.data).toHaveProperty('name', 'test3');
        expect(response.body.data).toHaveProperty('lastName', 'test3');
        expect(response.body.data).toHaveProperty('phoneNumber', '9234567891');
    });

    it('debería retornar un error si el email ya está en uso', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;

        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'ramosproque@gmail.com',
                password: 'password2',
                name: 'test3',
                lastName: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
    it('debería retornar un error si la cantidad de caracteres es demasiado extensa', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;

        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'a'.repeat(251) + '@example.com', // 251 caracteres
                password: 'password2',
                name: 'a'.repeat(101), // 101 caracteres
                lastName: 'a'.repeat(101), // 101 caracteres
                phoneNumber: '12345678901234567890' // 20 caracteres
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid phone number. Please enter a 10-digit phone number without any spaces or special characters.");
    });
    it('debería retornar un error si el email no tiene el formato correcto', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'invalid_email',
                password: 'password2',
                name: 'test3',
                lastName: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Format email incorrect');
    });

    it('debería retornar un error si la contraseña no tiene al menos 8 caracteres', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'pass', // menos de 8 caracteres
                name: 'test3',
                lastName: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Password must be at least 8 characters');
    });

    it('debería retornar un error si el número de teléfono contiene caracteres', async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'password2',
                name: 'test3',
                lastName: 'test3',
                phoneNumber: '923456789a' // contiene caracteres no numéricos
            })
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid phone number. Please enter a 10-digit phone number without any spaces or special characters.');
    });

    afterAll(async () => {
        let url_base_actualizar = `/api/v1/users/${uuid_new_user}`;

        let user_return =
        {
            name: "shonsadasd",
            lastName: "shonsadasd",
            phoneNumber: '9234567891',
            email: "testno434@example.com",
            password: "password"
        }
        const response = await request(app)
            .put(url_base_actualizar)
            .send(user_return)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
    });
});

