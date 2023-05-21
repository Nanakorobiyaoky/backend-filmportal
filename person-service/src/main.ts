import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PersonModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
      queue: 'persons_queue',
      queueOptions: {
        durable: true
      },
    },
  });

  await app.listen();
}
bootstrap();
