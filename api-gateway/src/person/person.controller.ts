import {Body, Controller, Get, Param, Put} from '@nestjs/common';
import {PersonService} from "./person.service";
import {PersonFullInfoDto} from "../dto/person-full-info.dto";
import {PersonNamePathDto} from "../dto/person-name-path.dto";

@Controller()
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Get('persons/:id')
	getPersonById(@Param('id') id: number): Promise<PersonFullInfoDto> {
		return this.personService.getPersonById(id)
	}


	@Put('movies/:genre')
	getPersonsByNamePart(@Body() personNamePathDto: PersonNamePathDto) {
		return this.personService.getPersonsByNamePart(personNamePathDto)
	}

	@Put('movies/:genre')
	getPersonsByNamePart2(@Body() personNamePathDto: PersonNamePathDto) {
		return this.personService.getPersonsByNamePart(personNamePathDto)
	}

}
