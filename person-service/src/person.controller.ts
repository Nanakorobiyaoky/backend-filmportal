import {Controller,} from '@nestjs/common';
import {PersonService} from './person.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {DirectorActorNamePathDto} from "./dto/director-actor-name-path.dto";
import {PersonNamePathDto} from "./dto/person-name-path.dto";

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

	@MessagePattern({cmd: "get persons by name Path"})
	findPersonsByName(@Payload() namesPath: DirectorActorNamePathDto) {
		return this.personService.findPersonsByName(namesPath)
	}

	@MessagePattern({cmd: "get persons by role and name path"})
	getPersonsByNamePart(@Payload() personNamePathDto: PersonNamePathDto) {
		console.log(personNamePathDto)
		return this.personService.getPersonsByNamePart(personNamePathDto)
	}



}
