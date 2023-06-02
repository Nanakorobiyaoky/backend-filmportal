import {Module} from '@nestjs/common';
import {FilmController} from './film.controller';
import {FilmService} from './film.service';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import * as process from "process";
import {Film} from "./models/films.model";
import {FilmCountry} from "./models/films-countries.model";
import {Country} from "./models/countries.model";
import {FilmGenre} from "./models/films-genres.model";
import {Genre} from "./models/genres.model";
import {FilmBudget} from "./models/films-budget.model";
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
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([
			Film,
			FilmCountry,
			Country,
			FilmGenre,
			Genre,
			FilmBudget,
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
		]),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [
				Film,
				FilmCountry,
				Country,
				FilmGenre,
				Genre,
				FilmBudget,
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
		}),
	],
	controllers: [FilmController],
	providers: [FilmService],
})
export class FilmModule {
}
