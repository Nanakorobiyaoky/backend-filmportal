import {NestFactory} from '@nestjs/core';
import {FilmModule} from './film.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(FilmModule, {
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
			queue: 'films_queue',
			queueOptions: {
				durable: true
			},
		},
	});

	await app.listen();
}

bootstrap();
