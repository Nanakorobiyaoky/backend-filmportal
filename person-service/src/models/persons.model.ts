import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {FilmActor} from "./through/films-actors.model";
import {FilmComposer} from "./through/films-composers.model";
import {FilmDesigner} from "./through/films-designers.model";
import {FilmDirector} from "./through/films-directors.model";
import {FilmEditor} from "./through/films-editors.model";
import {FilmOperator} from "./through/films-operators.model";
import {FilmProducer} from "./through/films-producers.model";
import {FilmVoiceDirector} from "./through/films-voice-directors.model";
import {FilmTranslator} from "./through/films-translators.model";
import {FilmVoice} from "./through/films-voices.model";
import {FilmWriter} from "./through/films-writers.model";

interface IPerson {
	id: number
	name_ru: string
	name_en: string
	birthday: string
	place_of_birth: string
	poster: string
}

@Table({tableName: 'persons', timestamps: false, freezeTableName: true})
export class Person extends Model<Person, IPerson> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	name_ru: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	name_en: string

	@Column({
		type: DataType.DATE,
		allowNull: true,
		defaultValue: null
	})
	birthday: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	place_of_birth: string

	@Column({
		type: DataType.STRING,
		allowNull: true,
		defaultValue: null
	})
	poster: string

	@HasMany(() => FilmActor, 'person_id')
	actor: FilmActor

	@HasMany(() => FilmComposer, 'person_id')
	composer: FilmComposer

	@HasMany(() => FilmDesigner, 'person_id')
	designer: FilmDesigner[]

	@HasMany(() => FilmDesigner, 'person_id')
	director: FilmDirector[]

	@HasMany(() => FilmEditor, 'person_id')
	editor: FilmEditor[]

	@HasMany(() => FilmOperator, 'person_id')
	operator: FilmOperator[]

	@HasMany(() => FilmProducer, 'person_id')
	producer: FilmProducer[]

	@HasMany(() => FilmTranslator, 'person_id')
	translator: FilmTranslator[]

	@HasMany(() => FilmVoiceDirector, 'person_id')
	voiceDirector: FilmVoiceDirector[]

	@HasMany(() => FilmVoice, 'person_id')
	voice: FilmVoice[]

	@HasMany(() => FilmWriter, 'person_id')
	writer: FilmWriter[]

}