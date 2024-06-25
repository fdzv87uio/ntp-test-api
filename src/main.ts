import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  const options = new DocumentBuilder()
    .setTitle('Events-CurcleUp')
    .addBearerAuth()
    .setDescription(
      'Document Service Events CurcleUp, endpoints GET, POST, PUT, DELETE',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`/${globalPrefix}/api`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.enableCors();
  app.use(cookieParser());
  app.use(helmet());

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  logger.log(
    `Server running on port ${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
  );
}
bootstrap();
