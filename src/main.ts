import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Cambia al dominio del frontend en producción
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Para enviar cookies si es necesario
  });

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}

bootstrap();
