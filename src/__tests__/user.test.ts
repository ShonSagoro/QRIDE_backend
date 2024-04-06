import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_inicio_sesion = '/api/v1/users/sing_in'
let url_base_register = '/api/v1/users/sing_up'

describe('Iniciar sesión', () => {
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
            console.log(response.body.message);
            expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;
    });

    it('no debería permitir un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: '', password: '12345678' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '' });
        expect(response.status).toBe(400);
    });

    it('no debería permitir un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'invalid', password: '12345678' });
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
            .send({ email: 'test@gmail.com', password: 'incorrect' });
        expect(response.status).toBe(404);
    });

    it('debería devolver un token si el acceso es correcto', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'test@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('user_token');
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

describe('Cerrar sesión', () => {
    let userUUIDToken: string;
    let userUUID: string;
    let jwtTokenBanned: string;
    let url_base_cierre_sesion: string;
    beforeAll(async () => {
        let response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test_sesion@gmail.com',
                password: '12345678'
            });
            console.log(response.body.message);

        expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;
        response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'test@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        userUUIDToken = response.body.data.uuid;
        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                email: 'test_sesion@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        jwtTokenBanned = response.body.data.jwt_token;
        url_base_cierre_sesion = `/api/v1/users/sing_out/${userUUID}`;
    });


    it('no debe ser posible cerrar sesión dos veces seguidas', async () => {
        let response = await request(app)
            .get(url_base_cierre_sesion)
            .set('Authorization', `Bearer ${jwtTokenBanned}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Sesión cerrada correctamente');

        response = await request(app)
            .get(url_base_cierre_sesion)
            .set('Authorization', `Bearer ${jwtTokenBanned}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Token is revoked');
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
        response = await request(app)
            .delete(`/api/v1/users/${userUUIDToken}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
})


describe('Editar perfil', () => {
    let userUUID: string;
    let userUUID2: string;
    let jwtToken: string;
    let url_base_actualizar: string;
    beforeAll(async () => {
        let response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'testupdate@gmail.com',
                password: '12345678'
            });
        console.log(response.body.message);

        expect(response.status).toBe(200);
        userUUID = response.body.data.uuid;

        response = await request(app)
            .post(url_base_register)
            .send({
                name: 'test',
                lastname: 'test',
                phoneNumber: '9234567891',
                email: 'testexist@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        userUUID2 = response.body.data.uuid;

        response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                email: 'testupdate@gmail.com',
                password: '12345678'
            });
        expect(response.status).toBe(200);
        jwtToken = response.body.data.jwt_token;
        url_base_actualizar = `/api/v1/users/${userUUID}`;
    });

    it('debería actualizar el perfil del usuario correctamente con datos válidos', async () => {
        let response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('User successfully updated');
        expect(response.body.data).toHaveProperty('uuid');
        expect(response.body.data).toHaveProperty('email', 'test1234@example.com');
        expect(response.body.data).toHaveProperty('name', 'test3');
        expect(response.body.data).toHaveProperty('lastname', 'test3');
        expect(response.body.data).toHaveProperty('phoneNumber', '9234567891');
    });

    it('debería retornar un error si el email ya está en uso', async () => {
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'testexist@gmail.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('debería retornar un error si la cantidad de caracteres es demasiado extensa', async () => {

        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'a'.repeat(251) + '@example.com', // 251 caracteres
                password: 'password2',
                name: 'a'.repeat(101), // 101 caracteres
                lastname: 'a'.repeat(101), // 101 caracteres
                phoneNumber: '12345678901234567890' // 20 caracteres
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Invalid phone number. Please enter a 10-digit phone number without any spaces or special characters.");
    });
    it('debería retornar un error si el email no tiene el formato correcto', async () => {
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'invalid_email',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Format email incorrect');
    });

    it('debería retornar un error si la contraseña no tiene al menos 8 caracteres', async () => {
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'pass', // menos de 8 caracteres
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '9234567891'
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Password must be at least 8 characters');
    });

    it('debería retornar un error si el número de teléfono contiene caracteres', async () => {
        const response = await request(app)
            .put(url_base_actualizar)
            .send({
                email: 'test1234@example.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a' // contiene caracteres no numéricos
            })
            .set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Invalid phone number. Please enter a 10-digit phone number without any spaces or special characters.');
    });
    afterAll(async () => {
        let response = await request(app)
            .post(url_base_inicio_sesion)
            .send({ email: 'testexist@gmail.com', password: '12345678' });
        expect(response.status).toBe(200);
        const token = response.body.data.jwt_token;
        response = await request(app)
            .delete(`/api/v1/users/${userUUID}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        response = await request(app)
            .delete(`/api/v1/users/${userUUID2}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    })

});

describe('Registrarse', () => {
    let uuidUser: string;
    it('El email no debe estar vacío.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: '',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a' // contiene caracteres no numéricos
            })
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
    it('La contraseña es demasiado larga para un objeto string (al maximo 20 caracteres)', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'password2password2password2', // more than 20 characters
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('El email debe cumplir con el formato.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'freeatgmail.com', // invalid email format
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('Los datos como numero de telefono puede o no tener datos', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '' // empty phone number
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('El nombre no debe estar vacío.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'password2',
                name: '', // empty name
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('El email debe ser único', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'test1@gmail.com', // email already exists
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
    });

    it('La contraseña no debe ser menor a 8 caracteres.', async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'free@gmail.com',
                password: 'pass', // less than 8 characters
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it("Formato correcto, entonces pasa", async () => {
        const response = await request(app)
            .post(url_base_register)
            .send({
                email: 'test11@gmail.com',
                password: 'password2',
                name: 'test3',
                lastname: 'test3',
                phoneNumber: '923456789a'
            });
        uuidUser = response.body.data.uuid;
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    afterAll(async () => {
        let response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                email: 'test11@gmail.com',
                password: 'password2'
            });
        expect(response.status).toBe(200);
        const token = response.body.data.jwt_token;
        response = await request(app)
            .delete(`/api/v1/users/${uuidUser}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});

afterAll(async () => {
    server.close();
});
