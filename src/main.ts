import { AdminModule } from '@adminjs/nestjs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { OpenApiNestFactory } from 'nest-openapi-tools';

// const httpsOptions = {
//   key: fs.readFileSync('./secrets/private-key.pem'),
//   cert: fs.readFileSync('./secrets/public-certificate.pem'),}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'static'))

  // const config = new DocumentBuilder()
  //   .setTitle('User example')
  //   .setDescription('The user API description')
  //   .setVersion('1.0')
  //   .addTag('user')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document, {
  //   uiConfig: {
  //     tryItOutEnabled: false,
  //   },
  //   customSiteTitle: 'Racks API'

  // });

  await OpenApiNestFactory.configure(app, 
    new DocumentBuilder()
      .setTitle('Racks API')
      .addBearerAuth(),
    {
      webServerOptions: {
        enabled: true,
        path: 'api',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.yaml',  // or ./openapi.json
      },
      clientGeneratorOptions: {
        enabled: true,
        type: 'typescript-axios',
        outputFolderPath: '../racks-client-sdk/src',
        additionalProperties:
          'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=false',
        openApiFilePath: './openapi.yaml', // or ./openapi.json
        skipValidation: true, // optional, false by default
      },
    }, {
    operationIdFactory: (c: string, method: string) => method,
  });

  await app.listen(process.env.PORT || 3000)
}
bootstrap();
