import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { EntityPropertyNotFoundFilter } from './core/exception';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  /**
   * This logger is used to log the request and response of the API in the console
   */
  app.useLogger(app.get(Logger));

  /**
   * This middleware is used to enable the CORS for the application
   */
  app.enableCors();

  /**
   * This pipe is used to validate the DTOs
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /**
   * This filter is used to catch the error thrown by the @Column decorator
   */
  app.useGlobalFilters(new EntityPropertyNotFoundFilter());

  const configService = app.get(ConfigService);

  /**
   * This is the swagger configuration for the API documentation generation and display on the browser at /docs route
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Music Store')
    .setDescription('Music Store API Documentations')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configService.get('PORT'));
}

bootstrap();
