import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  const logger = new Logger();

  const globalPrefix = 'v1';
  app.setGlobalPrefix(globalPrefix);
  const options = new DocumentBuilder()
    .setTitle('NTP-TEST-API')
    .addBearerAuth()
    .setDescription(
      'A Nest.js REST API Service for the NTP Test',
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
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
  logger.log(
    `Server running on port ${process.env.PORT ? parseInt(process.env.PORT) : 3000}`,
  );
}
bootstrap();
