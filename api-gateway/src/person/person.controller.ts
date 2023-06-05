import {Body, Controller, Get, Param, Put} from '@nestjs/common';
import {PersonService} from "./person.service";
import {PersonFullInfoDto} from "../dto/person-full-info.dto";
import {PersonNamePartDto} from "../dto/person-name-part.dto";

@Controller()
export class PersonController {
	constructor(private readonly personService: PersonService) {}

	@Get('persons/:id')
	getPersonById(@Param('id') id: number): Promise<PersonFullInfoDto> {
		return this.personService.getPersonById(id)
	}

	@Put('movies/')
	getPersonsByNamePart(@Body() personNamePartDto: PersonNamePartDto) {
		return this.personService.getPersonsByNamePart(personNamePartDto)
	}

	@Put('movies/:genre')
	getPersonsByNamePart2(@Body() personNamePartDto: PersonNamePartDto) {
		return this.personService.getPersonsByNamePart(personNamePartDto)
	}

}
