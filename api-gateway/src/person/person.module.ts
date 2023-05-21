import {Module} from '@nestjs/common';
import {PersonController} from './person.controller';
import {PersonService} from './person.service';
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ClientsModule.register([
			{
				name: 'PERSON_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
					queue: 'persons_queue',
					queueOptions: {
						durable: true
					}
				},
			}
		]),
	],
	controllers: [PersonController],
	providers: [PersonService],
	exports: [PersonService]
})
export class PersonModule {
}
