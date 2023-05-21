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

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		SequelizeModule.forFeature([Film, FilmCountry, Country, FilmGenre, Genre, FilmBudget]),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: +process.env.POSTGRES_PORT,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			models: [Film, FilmCountry, Country, FilmGenre, Genre, FilmBudget],
			autoLoadModels: true
		}),

	],
	controllers: [FilmController],
	providers: [FilmService],
})
export class FilmModule {
}
