import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe para realizar la validación de forma global
  app.useGlobalPipes(new ValidationPipe({
    
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//?POSTGRES
//! npm i pg
//! npm i @types/pg

//?MySQL
//! npm install mysql2
//! npm install -D @types/mysql2