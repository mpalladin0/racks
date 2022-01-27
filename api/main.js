"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'static'));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('User example')
        .setDescription('The user API description')
        .setVersion('1.0')
        .addTag('user')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map