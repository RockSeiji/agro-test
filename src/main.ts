import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Agro API')
    .setDescription('API para gerenciamento de produtores rurais')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
  exceptionFactory: (errors) => {
    return new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Erro de validação nos campos.',
        errors: errors.map(err => ({
          field: err.property,
          constraints: err.constraints,
        })),
      },
      HttpStatus.BAD_REQUEST,
    );
  },
}));

  await app.listen(3000);
}
bootstrap();
