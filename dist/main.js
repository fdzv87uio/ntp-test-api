"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    const logger = new common_1.Logger();
    const globalPrefix = 'v1';
    app.setGlobalPrefix(globalPrefix);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Savy Worker Backend')
        .addBearerAuth()
        .setDescription('A Nest.js REST API Service for the SAVY WORKER System')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(`/${globalPrefix}/api`, app, document);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.enableCors();
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
        next();
    });
    app.use(cookieParser());
    app.use((0, helmet_1.default)());
    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
    logger.log(`Server running on port ${process.env.PORT ? parseInt(process.env.PORT) : 3000}`);
}
bootstrap();
//# sourceMappingURL=main.js.map