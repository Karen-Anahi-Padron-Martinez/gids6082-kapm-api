import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe para realizar la validación de forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  //Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API con vulnerabilidades de seguridad')
  .setDescription('Documentación de la API para pruebas')
  .setVersion('1.0.0')
  .addServer("http://localhost:3000","Servidor de Pruebas")
  .addServer("https://www.dominio.com","Servidor de produccion")
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api/docs',app,document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//?POSTGRES
//! npm i pg
//! npm i @types/pg

//?MySQL
//! npm install mysql2
//! npm install -D @types/mysql2

//! npm i @nestjs/swagger

//! git commit -a -m "fix:Correcion del CRUD y uso de swagger"