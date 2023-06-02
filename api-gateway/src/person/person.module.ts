import {forwardRef, Module} from '@nestjs/common';
import {PersonController} from './person.controller';
import {PersonService} from './person.service';
import {ConfigModule} from "@nestjs/config";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {FilmModule} from "../film/film.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";

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
		forwardRef(() => FilmModule)
	],
	controllers: [PersonController],
	providers: [PersonService],
	exports: [PersonService]
})
export class PersonModule {
}
