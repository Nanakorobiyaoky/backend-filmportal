import {Module} from '@nestjs/common';
import {CommentService} from './comment.service';
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";


@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ClientsModule.register([
			{
				name: 'COMMENT_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
					queue: 'comments_queue',
					queueOptions: {
						durable: true
					}
				},
			},
		]),
	],
	providers: [CommentService],
	exports: [CommentService]
})
export class CommentModule {
}
