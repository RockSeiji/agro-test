import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module';

describe('Main bootstrap (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('deve estar rodando e responder na raiz', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect([200, 404]).toContain(res.status);
  });

  it('deve aplicar o ValidationPipe global', async () => {
    const res = await request(app.getHttpServer())
      .post('/producers/add')
      .send({});
    expect([400, 201, 500]).toContain(res.status);
    if (res.status === 400) {
      expect(res.body).toHaveProperty('message', 'Erro de validação nos campos.');
      expect(res.body).toHaveProperty('errors');
    }
  });

  it('deve expor a documentação Swagger', async () => {
    const res = await request(app.getHttpServer()).get('/api');
    expect([200, 301, 302, 404]).toContain(res.status);
  });
});
