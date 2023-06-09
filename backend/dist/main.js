"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    app.enableCors({
        origin: ['http://127.0.0.1:3000'],
        credentials: true
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('KANBAN Api')
        .setVersion('0.0.1')
        .setDescription('All the response schemas also have the properties: <code>id: number</code>, <code>created_at: string </code> and <code>updated_at: string</code>')
        .setContact('Mateus Bolotaro', 'https://github.com/mbolotaro/', 'mbolotaro@gmail.com')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map