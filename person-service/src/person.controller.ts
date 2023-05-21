import {Controller,} from '@nestjs/common';
import {PersonService} from './person.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

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
}
