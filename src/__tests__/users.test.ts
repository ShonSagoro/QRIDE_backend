import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
import request from 'supertest';
import { app, server } from '../app';

jest.setTimeout(30000);

let url_base_registro = '/api/v1/usuarios/registro';
let url_base_inicio_sesion = '/api/v1/usuarios/iniciar_sesion';

afterAll(async () => {
    server.close();
});

describe('Registro de usuarios', () => {
    it('debería registrar un nuevo usuario correctamente', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Usuario registrado correctamente');
        expect(response.body.data).toHaveProperty('uuid');
    });

    it('no debería permitir el registro con un correo electrónico vacío', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: '',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con una contraseña vacía', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: ''
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un formato de correo electrónico inválido', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'correoinvalido',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el registro con un correo electrónico que ya está en uso', async () => {
        const response = await request(app)
            .post(url_base_registro)
            .send({
                nombre: 'UsuarioTest',
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
    });
});

describe('Inicio de sesión', () => {
    it('debería permitir el inicio de sesión con credenciales válidas', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
        expect(response.body.data).toHaveProperty('jwt_token');
        expect(response.body.data).toHaveProperty('usuario');
    });

    it('no debería permitir el inicio de sesión con un correo electrónico inexistente', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'correo_inexistente@example.com',
                contraseña: 'contraseña123'
            });
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
    });

    it('no debería permitir el inicio de sesión con una contraseña incorrecta', async () => {
        const response = await request(app)
            .post(url_base_inicio_sesion)
            .send({
                correo: 'usuariotest@example.com',
                contraseña: 'contraseña_incorrecta'
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
    });
});
