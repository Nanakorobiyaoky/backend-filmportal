import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";

async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api')
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(`Started on ${PORT}`)
  });
}

bootstrap();
