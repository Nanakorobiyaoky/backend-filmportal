import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Country} from "./countries.model";
import {FilmCountry} from "./films-countries.model";
import {FilmGenre} from "./films-genres.model";
import {Genre} from "./genres.model";
import {FilmBudget} from "./films-budget.model";
import {FilmActor} from "./through/films-actors.model";
import {FilmComposer} from "./through/films-composers.model";
import {FilmDesigner} from "./through/films-designers.model";
import {FilmDirector} from "./through/films-directors.model";
import {FilmEditor} from "./through/films-editors.model";
import {FilmOperator} from "./through/films-operators.model";
import {FilmProducer} from "./through/films-producers.model";
import {FilmTranslator} from "./through/films-translators.model";
import {FilmVoiceDirector} from "./through/films-voice-directors.model";
import {FilmVoice} from "./through/films-voices.model";
import {FilmWriter} from "./through/films-writers.model";

interface IFilm {
		id: number
		id_kinopoisk: number
		name_ru: string
		name_en: string
		tagline: string
		world_premier: string
		age: string
		MPAA: string
		duration_min: number
		rating: number
		marks: number
		poster: string

}

@Table({tableName: 'films', timestamps: false, freezeTableName: true})
export class Film extends Model<Film, IFilm> {
	@Column( {
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column( {
		type: DataType.INTEGER,
		unique: 'uniqueData'
	})
	id_kinopoisk: number

	@Column( {
		type: DataType.STRING,
		allowNull: false,
		unique: 'uniqueData'
	})
	name_ru: string

	@Column( {
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	name_en: string

	@Column( {
		type: DataType.TEXT,
		allowNull: true,
		defaultValue: null
	})
	tagline: string

	@Column( {
		type: DataType.DATE,
		allowNull: true,
		defaultValue: null
	})
	world_premier: number

	@Column( {
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	age: string

	@Column( {
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	MPAA: string

	@Column( {
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: null
	})
	duration_min: number

	@Column( {
		type: DataType.FLOAT,
		allowNull: true,
		defaultValue: null
	})
	rating: number

	@Column( {
		type: DataType.INTEGER,
		allowNull: true,
		defaultValue: null
	})
	marks: number

	@Column( {
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	poster: string

	@BelongsToMany(() => Country, () => FilmCountry)
	country: Country[];

	@BelongsToMany(() => Genre, () => FilmGenre)
	genres: Genre[]

	@HasOne(() => FilmBudget)
	budget: FilmBudget

	@HasMany(() => FilmActor)
	actors: FilmActor[]

	@HasMany(() => FilmComposer)
	composers: FilmComposer[]

	@HasMany(() => FilmDesigner)
	designers: FilmDesigner[]

	@HasMany(() => FilmDirector)
	directors: FilmDirector[]

	@HasMany(() => FilmEditor)
	editors: FilmEditor[]

	@HasMany(() => FilmOperator)
	operators: FilmOperator[]

	@HasMany(() => FilmProducer)
	producers: FilmProducer[]

	@HasMany(() => FilmTranslator)
	translators: FilmTranslator[]

	@HasMany(() => FilmVoiceDirector)
	voiceDirectors: FilmVoiceDirector[]

	@HasMany(() => FilmVoice)
	voices: FilmVoice[]

	@HasMany(() => FilmWriter)
	writers: FilmWriter[]

}
