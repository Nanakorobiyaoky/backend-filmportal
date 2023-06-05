import {Controller,} from '@nestjs/common';
import {PersonService} from './person.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {DirectorActorNamePartDto} from "./dto/director-actor-name-part.dto";
import {PersonNamePartDto} from "./dto/person-name-part.dto";

@Controller('persons')
export class PersonController {
	constructor(private readonly personService: PersonService) {
	}


	@MessagePattern({cmd: 'get person by id'})
	getPersonById(@Payload() id: number) {
		return this.personService.getPersonById(id)
	}

	@MessagePattern({cmd: "get persons by film id"})
	getPersonsByFilmId(@Payload() id: number) {
		return this.personService.getPersonsByFilmId(id)
	}

	@MessagePattern({cmd: "get persons by name Part"})
	findPersonsByName(@Payload() namesPart: DirectorActorNamePartDto) {
		return this.personService.findPersonsByName(namesPart)
	}

	@MessagePattern({cmd: "get persons by role and name part"})
	getPersonsByNamePart(@Payload() personNamePartDto: PersonNamePartDto) {
		console.log(personNamePartDto)
		return this.personService.getPersonsByNamePart(personNamePartDto)
	}



}
