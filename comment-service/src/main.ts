import {NestFactory} from '@nestjs/core';
import {CommentModule} from './comment.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommentModule, {
		transport: Transport.RMQ,
		options: {
			urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
			queue: 'comments_queue',
			queueOptions: {
				durable: true
			},
		},
	});

	await app.listen();
}

bootstrap();
