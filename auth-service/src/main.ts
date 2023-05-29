import {NestFactory} from '@nestjs/core';
import {AuthModule} from './auth.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
			queue: 'auth_queue',
			queueOptions: {
				durable: true
			},
		},
	});

	await app.listen();
}

bootstrap();
