import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Person} from "./models/persons.model";

@Injectable()
export class PersonService {

	constructor(@InjectModel(Person) private readonly personRepository: typeof Person) {
	}

	async getPersonById(id) {
		const person = await this.personRepository.findByPk(id)
		return person
	}

	async getPersonsByFilmId(id: number) {
		const persons = {

		}
		return persons
	}

	async getPersonsByRole(filmId: number, repository) {

	}
}
