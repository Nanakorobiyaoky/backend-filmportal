import {Module} from '@nestjs/common';
import {PersonController} from './person.controller';
import {PersonService} from './person.service';
import * as process from "process";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Person} from "./models/persons.model";
import {FilmActor} from "./models/through/films-actors.model";
import {FilmComposer} from "./models/through/films-composers.model";
import {FilmDesigner} from "./models/through/films-designers.model";
import {FilmDirector} from "./models/through/films-directors.model";
import {FilmEditor} from "./models/through/films-editors.model";
import {FilmOperator} from "./models/through/films-operators.model";
import {FilmProducer} from "./models/through/films-producers.model";
import {FilmTranslator} from "./models/through/films-translators.model";
import {FilmVoiceDirector} from "./models/through/films-voice-directors.model";
import {FilmVoice} from "./models/through/films-voices.model";
import {FilmWriter} from "./models/through/films-writers.model";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([
			Person,
			FilmActor,
			FilmComposer,
			FilmDesigner,
			FilmDirector,
			FilmEditor,
			FilmOperator,
			FilmProducer,
			FilmTranslator,
			FilmVoiceDirector,
			FilmVoice,
			FilmWriter
			]
		),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [
				Person,
				FilmActor,
				FilmComposer,
				FilmDesigner,
				FilmDirector,
				FilmEditor,
				FilmOperator,
				FilmProducer,
				FilmTranslator,
				FilmVoiceDirector,
				FilmVoice,
				FilmWriter
			],
			autoLoadModels: true
		})
	],
	controllers: [PersonController],
	providers: [PersonService],
})
export class PersonModule {
}
