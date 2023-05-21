import {Module} from '@nestjs/common';
import {FilmController} from "./film.controller";
import {FilmService} from "./film.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {ConfigModule} from "@nestjs/config";
import {PersonModule} from "../person/person.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		ClientsModule.register([
			{
				name: 'FILM_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: [`amqp://${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`],
					queue: 'films_queue',
					queueOptions: {
						durable: true
					}
				},
			},
		]),
		PersonModule
	],
	controllers: [FilmController],
	providers: [FilmService],
	exports: []
})
export class FilmModule {
}
