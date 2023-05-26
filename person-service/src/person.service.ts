import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
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
import {Model} from "sequelize-typescript";

@Injectable()
export class PersonService {

	constructor(
		@InjectModel(Person) private readonly personRepository: typeof Person,
		@InjectModel(FilmActor) private readonly filmActorRepository: typeof FilmActor,
		@InjectModel(FilmComposer) private readonly filmComposerRepository: typeof FilmComposer,
		@InjectModel(FilmDesigner) private readonly filmDesignerRepository: typeof FilmDesigner,
		@InjectModel(FilmDirector) private readonly filmDirectorRepository: typeof FilmDirector,
		@InjectModel(FilmEditor) private readonly filmEditorRepository: typeof FilmEditor,
		@InjectModel(FilmOperator) private readonly filmOperatorRepository: typeof FilmOperator,
		@InjectModel(FilmProducer) private readonly filmProducerRepository: typeof FilmProducer,
		@InjectModel(FilmTranslator) private readonly filmTranslatorRepository: typeof FilmTranslator,
		@InjectModel(FilmVoiceDirector) private readonly filmVoiceDirectorRepository: typeof FilmVoiceDirector,
		@InjectModel(FilmVoice) private readonly filmVoiceRepository: typeof FilmVoice,
		@InjectModel(FilmWriter) private readonly filmWriterRepository: typeof FilmWriter,
		){}

	async getPersonById(id: number) {
		const person = await this.personRepository.findByPk(id, {
			include: {
				all: true,
				attributes: ['film_id']
			}
		})
		return person
	}

	async getPersonsByFilmId(filmId: number) {
		const persons = {
			actors: await this.getPersonsByRole(filmId, this.filmActorRepository),
			composers: await this.getPersonsByRole(filmId, this.filmComposerRepository),
			designers: await this.getPersonsByRole(filmId, this.filmDesignerRepository),
			directors: await this.getPersonsByRole(filmId, this.filmDirectorRepository),
			editors: await this.getPersonsByRole(filmId, this.filmEditorRepository),
			operators: await this.getPersonsByRole(filmId, this.filmOperatorRepository),
			producers: await this.getPersonsByRole(filmId, this.filmProducerRepository),
			translators: await this.getPersonsByRole(filmId, this.filmTranslatorRepository),
			voiceDirectors: await this.getPersonsByRole(filmId, this.filmVoiceDirectorRepository),
			voices: await this.getPersonsByRole(filmId, this.filmVoiceRepository),
			writers: await this.getPersonsByRole(filmId, this.filmWriterRepository),
		}
		return persons
	}

	private async getPersonsByRole(filmId: number, repository) {
		try {
			const persons =  await repository.findAll({
				where: {
					film_id: filmId
				},
				attributes: [],
				include: {
					model: this.personRepository,
					attributes: ['id', 'name_ru', 'name_en', 'poster']
				}
			})
			return persons.map(data => data["person"])
		} catch (e) {
			console.log(e)
			return {}
		}
	}
}
